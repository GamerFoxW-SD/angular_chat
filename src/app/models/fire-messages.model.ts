export interface Message {
  id?: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  timestamp: Date;
}
