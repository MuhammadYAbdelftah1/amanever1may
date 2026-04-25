// Transport abstraction for chatbot communication
import type { Message, Audience } from "./types";

export interface ChatTransport {
  send(message: {
    text?: string;
    value?: string;
    nodeId: string;
  }): Promise<void>;
  onMessage(cb: (msg: Message) => void): () => void;
  setAudience(audience: Audience): void;
}

/**
 * MockTransport - Phase 1 implementation
 * Drives the flow engine locally without a backend
 */
export class MockTransport implements ChatTransport {
  private messageCallbacks: Array<(msg: Message) => void> = [];
  private audience: Audience | null = null;

  async send(message: {
    text?: string;
    value?: string;
    nodeId: string;
  }): Promise<void> {
    // In Phase 1, this is a no-op
    // The flow engine handles all logic locally
    // In Phase 2+, this would send to WhatsApp Cloud API / backend WebSocket
    if (process.env.NODE_ENV === "development") {
      console.log("[MockTransport] send:", message);
    }
  }

  onMessage(cb: (msg: Message) => void): () => void {
    this.messageCallbacks.push(cb);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter((c) => c !== cb);
    };
  }

  setAudience(audience: Audience): void {
    this.audience = audience;
    if (process.env.NODE_ENV === "development") {
      console.log("[MockTransport] audience set:", audience);
    }
  }

  // Internal method for flow engine to emit messages
  _emit(message: Message): void {
    this.messageCallbacks.forEach((cb) => cb(message));
  }
}

/**
 * RealtimeTransport - Phase 2+ implementation (stub)
 * Will wrap WhatsApp Cloud API / backend WebSocket
 */
export class RealtimeTransport implements ChatTransport {
  async send(): Promise<void> {
    throw new Error("RealtimeTransport not implemented yet - Phase 2+");
  }

  onMessage(): () => void {
    throw new Error("RealtimeTransport not implemented yet - Phase 2+");
  }

  setAudience(): void {
    throw new Error("RealtimeTransport not implemented yet - Phase 2+");
  }
}
