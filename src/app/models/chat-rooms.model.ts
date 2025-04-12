export interface ChatRoom {
    id: number;
    name?: string;
    participantIds: number[]; // pl. [1, 2] vagy [1, 2, 3]
  }
  