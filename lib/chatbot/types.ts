// Core chatbot types for Aman Ever "Omniya" assistant

export type Audience = "patient" | "doctor" | "partner" | "affiliate";

export type Block =
  | { type: "text"; text: string }
  | { type: "card"; title: string; body?: string; icon?: string; href?: string }
  | { type: "list"; items: Array<{ label: string; value: string }> }
  | { type: "link"; label: string; href: string; external?: boolean }
  | { type: "divider" }
  | { type: "image"; src: string; alt: string };

export type QuickReply = {
  label: string;
  value: string;
  icon?: string;
};

export type Message = {
  id: string;
  role: "bot" | "user" | "system";
  blocks: Block[];
  quickReplies?: QuickReply[];
  createdAt: number;
};

export type FlowNode = {
  id: string;
  audience?: Audience;
  blocks: Block[];
  quickReplies?: QuickReply[];
  input?: {
    key: string;
    placeholder: string;
    validate?: "phone" | "email" | "text";
    required?: boolean;
  };
  next?: string | Record<string, string>; // static next OR map by quick-reply value
  handoff?: {
    channel: "whatsapp";
    prefilledMessage: string;
  };
  emergency?: boolean; // marks this node as emergency screen
  final?: boolean;
};

export type FlowFile = {
  startNode: string;
  nodes: Record<string, FlowNode>;
};

export type UserProfile = {
  audience?: Audience;
  name?: string;
  phone?: string;
  city?: string;
  specialty?: string;
  partnerId?: string; // ID للشركاء
  affiliateId?: string; // ID للمسوقين
  consent: boolean;
};

export type ChatState = {
  messages: Message[];
  currentNodeId: string | null;
  userProfile: UserProfile;
  isOpen: boolean;
  isTyping: boolean;
  unreadCount: number;
  conversationStartedAt: number | null;
};

export type IntentType =
  | "emergency"
  | "booking"
  | "membership"
  | "network"
  | "refund"
  | "unknown";
