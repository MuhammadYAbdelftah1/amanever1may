// JSON-driven flow engine for Omniya chatbot
import type { FlowFile, FlowNode, Message, Block, QuickReply } from "./types";
import { useChatStore } from "./store";
import { detectIntent } from "./intents";
import { track } from "./analytics";
import { TYPING_DELAY_MS, BLOCK_STAGGER_MS } from "./constants";

export class FlowEngine {
  private flows: Map<string, FlowFile> = new Map();
  private currentFlow: FlowFile | null = null;

  /**
   * Register a flow file
   */
  registerFlow(name: string, flow: FlowFile): void {
    this.flows.set(name, flow);
  }

  /**
   * Load a flow by name
   */
  loadFlow(name: string): void {
    const flow = this.flows.get(name);
    if (!flow) {
      throw new Error(`Flow "${name}" not found`);
    }
    this.currentFlow = flow;
  }

  /**
   * Start the conversation from the root flow
   */
  async start(): Promise<void> {
    const rootFlow = this.flows.get("root");
    if (!rootFlow) {
      throw new Error("Root flow not registered");
    }

    this.currentFlow = rootFlow;
    await this.goToNode(rootFlow.startNode);
  }

  /**
   * Navigate to a specific node
   */
  async goToNode(nodeId: string): Promise<void> {
    if (!this.currentFlow) {
      throw new Error("No flow loaded");
    }

    // Handle cross-flow navigation (e.g., "patient:welcome")
    if (nodeId.includes(":")) {
      const [flowName, localNodeId] = nodeId.split(":");
      const targetFlow = this.flows.get(flowName);
      if (targetFlow) {
        this.currentFlow = targetFlow;
        nodeId = localNodeId;
      }
    }

    const node = this.currentFlow.nodes[nodeId];
    if (!node) {
      console.error(`Node "${nodeId}" not found in current flow`);
      return;
    }

    // Update store
    useChatStore.getState().setCurrentNode(nodeId);

    // Track analytics
    track({ event: "chat_node_reached", nodeId });

    // Show typing indicator
    useChatStore.getState().setTyping(true);

    // Delay before showing message
    await this.delay(TYPING_DELAY_MS);

    // Replace placeholders in blocks
    const { userProfile } = useChatStore.getState();
    const processedBlocks = this.replaceBlockPlaceholders(node.blocks, userProfile);

    // Create bot message
    const message: Message = {
      id: this.generateId(),
      role: "bot",
      blocks: processedBlocks,
      quickReplies: node.quickReplies,
      createdAt: Date.now(),
    };

    // Add message to store
    useChatStore.getState().addMessage(message);
    useChatStore.getState().setTyping(false);

    // Handle handoff if present
    if (node.handoff) {
      await this.delay(2500); // Wait 2.5 seconds before handoff
      this.handleHandoff(node.handoff, userProfile);
      return;
    }

    // If node has a static next and no input/quickReplies, auto-advance
    if (
      typeof node.next === "string" &&
      !node.input &&
      !node.quickReplies?.length &&
      !node.handoff
    ) {
      await this.delay(BLOCK_STAGGER_MS);
      await this.goToNode(node.next);
    }
  }

  /**
   * Handle user input (text or quick reply)
   */
  async handleUserInput(input: {
    text?: string;
    value?: string;
    quickReplyLabel?: string;
  }): Promise<void> {
    const { currentNodeId, userProfile } = useChatStore.getState();
    if (!currentNodeId || !this.currentFlow) return;

    const currentNode = this.currentFlow.nodes[currentNodeId];
    if (!currentNode) return;

    // Check for emergency intent
    if (input.text) {
      const intent = detectIntent(input.text);
      if (intent === "emergency") {
        track({ event: "chat_emergency_triggered", keyword: input.text });
        await this.goToNode("emergency");
        return;
      }
    }

    // Add user message to chat
    const userMessage: Message = {
      id: this.generateId(),
      role: "user",
      blocks: [
        {
          type: "text",
          text: input.quickReplyLabel || input.text || input.value || "",
        },
      ],
      createdAt: Date.now(),
    };
    useChatStore.getState().addMessage(userMessage);

    // Track analytics
    if (input.text) {
      track({ event: "chat_user_message_sent", length: input.text.length });
    }
    if (input.value) {
      track({
        event: "chat_quick_reply_clicked",
        nodeId: currentNodeId,
        value: input.value,
      });
    }

    // Handle input validation if node expects input
    if (currentNode.input) {
      const inputValue = input.text || "";
      const isValid = this.validateInput(
        inputValue,
        currentNode.input.validate
      );

      if (!isValid) {
        // Show validation error
        const errorMessage: Message = {
          id: this.generateId(),
          role: "bot",
          blocks: [
            {
              type: "text",
              text: this.getValidationErrorMessage(currentNode.input.validate),
            },
          ],
          createdAt: Date.now(),
        };
        useChatStore.getState().addMessage(errorMessage);
        return;
      }

      // Store input in user profile
      if (currentNode.input.key) {
        // Get dummy data if available
        const dummyData = this.getDummyData(currentNode.input.key, inputValue);
        useChatStore.getState().updateProfile({
          [currentNode.input.key]: inputValue,
          ...dummyData,
        });
      }
    }

    // Determine next node
    let nextNodeId: string | null = null;

    if (typeof currentNode.next === "string") {
      nextNodeId = currentNode.next;
    } else if (typeof currentNode.next === "object" && input.value) {
      nextNodeId = currentNode.next[input.value] || null;

      // Handle audience selection
      if (
        currentNodeId === "welcome" &&
        ["patient", "doctor", "partner", "affiliate"].includes(input.value)
      ) {
        useChatStore
          .getState()
          .setAudience(input.value as "patient" | "doctor" | "partner" | "affiliate");
        track({ event: "chat_audience_selected", audience: input.value });
      }
    }

    // Navigate to next node
    if (nextNodeId) {
      // Replace placeholders in next node
      await this.goToNode(this.replacePlaceholders(nextNodeId, userProfile));
    } else if (currentNode.final) {
      // Conversation ended
      useChatStore.getState().setCurrentNode(null);
    }
  }

  /**
   * Validate user input
   */
  private validateInput(
    value: string,
    type?: "phone" | "email" | "text" | "partner_id" | "affiliate_id"
  ): boolean {
    if (!type || type === "text") return true;

    if (type === "phone") {
      // KSA phone format: 05xxxxxxxx or +9665xxxxxxxx
      return /^(05|\+9665)\d{8}$/.test(value);
    }

    if (type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (type === "partner_id") {
      // Format: aeXXXX (ae followed by 4 digits)
      return /^ae\d{4}$/i.test(value);
    }

    if (type === "affiliate_id") {
      // Format: aeXXXX (ae followed by 4 digits)
      return /^ae\d{4}$/i.test(value);
    }

    return true;
  }

  /**
   * Get validation error message
   */
  private getValidationErrorMessage(type?: "phone" | "email" | "text" | "partner_id" | "affiliate_id"): string {
    if (type === "phone") {
      return "الرجاء إدخال رقم جوال صحيح (مثال: 0512345678)";
    }
    if (type === "email") {
      return "الرجاء إدخال بريد إلكتروني صحيح";
    }
    if (type === "partner_id") {
      return "الرجاء إدخال ID صحيح بصيغة aeXXXX (مثال: ae1001)";
    }
    if (type === "affiliate_id") {
      return "الرجاء إدخال ID صحيح بصيغة aeXXXX (مثال: ae2001)";
    }
    return "الرجاء إدخال قيمة صحيحة";
  }

  /**
   * Handle handoff to human agent
   */
  private handleHandoff(
    handoff: { channel: "whatsapp"; prefilledMessage: string },
    profile: any
  ): void {
    if (handoff.channel === "whatsapp") {
      const message = this.replacePlaceholders(handoff.prefilledMessage, profile);
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/966920003555?text=${encodedMessage}`;
      
      track({ event: "chat_handoff_whatsapp_clicked", topic: "partner" });
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");
    }
  }

  /**
   * Replace placeholders in blocks
   */
  private replaceBlockPlaceholders(blocks: Block[], profile: any): Block[] {
    return blocks.map((block) => {
      if (block.type === "text") {
        return {
          ...block,
          text: this.replacePlaceholders(block.text, profile),
        };
      }
      if (block.type === "card") {
        return {
          ...block,
          title: this.replacePlaceholders(block.title, profile),
          body: block.body ? this.replacePlaceholders(block.body, profile) : undefined,
        };
      }
      return block;
    });
  }

  /**
   * Get dummy data for testing
   */
  private getDummyData(key: string, value: string): Record<string, any> {
    // Partner dummy data
    if (key === "partnerId") {
      const partnerData: Record<string, any> = {
        ae1001: {
          partnerName: "مستشفى الملك فيصل",
          partnerType: "مستشفى",
        },
        ae1002: {
          partnerName: "عيادات النور الطبية",
          partnerType: "عيادة",
        },
        ae1003: {
          partnerName: "مجمع الرعاية الصحية",
          partnerType: "مجمع طبي",
        },
      };
      return partnerData[value.toLowerCase()] || {
        partnerName: "منشأة طبية",
        partnerType: "شريك",
      };
    }

    // Affiliate dummy data
    if (key === "affiliateId") {
      const affiliateData: Record<string, any> = {
        ae2001: {
          affiliateName: "أحمد المسوق",
          commission: "15",
          sales: "12,500",
        },
        ae2002: {
          affiliateName: "سارة التسويقية",
          commission: "20",
          sales: "25,800",
        },
        ae2003: {
          affiliateName: "محمد الشريك",
          commission: "18",
          sales: "18,200",
        },
      };
      return affiliateData[value.toLowerCase()] || {
        affiliateName: "مسوق",
        commission: "10",
        sales: "0",
      };
    }

    return {};
  }

  /**
   * Replace placeholders in text with user profile data
   */
  private replacePlaceholders(text: string, profile: any): string {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return profile[key] || "";
    });
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const flowEngine = new FlowEngine();
