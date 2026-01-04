import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Inquiry, ContactMessage } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
export class InquiryEntity extends IndexedEntity<Inquiry> {
  static readonly entityName = "inquiry";
  static readonly indexName = "inquiries";
  static readonly initialState: Inquiry = {
    id: "",
    customerName: "",
    email: "",
    phone: "",
    eventDate: "",
    address: "",
    items: [],
    totalAmount: 0,
    status: "pending",
    createdAt: 0
  };
}
export class ContactMessageEntity extends IndexedEntity<ContactMessage> {
  static readonly entityName = "contact_message";
  static readonly indexName = "contact_messages";
  static readonly initialState: ContactMessage = {
    id: "",
    name: "",
    email: "",
    subject: "",
    message: "",
    createdAt: 0,
    status: "unread"
  };
}