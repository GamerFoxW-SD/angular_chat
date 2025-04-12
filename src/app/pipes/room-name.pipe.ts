import { Pipe, PipeTransform,inject } from '@angular/core';
import {User} from '../models/user.model'
import {ChatRoom} from '../models/chat-rooms.model'
import { ChatService } from '../services/chat.service';

@Pipe({
  name: 'roomName',
  standalone: true 
})
export class RoomNamePipe implements PipeTransform {

 // constructor(private chatService: ChatService) {}
 private chatService = inject(ChatService);

  transform(room: ChatRoom, getUserById: (id: number) => User | undefined): string {
    if (room.name !== undefined) {
      return room.name;
    }

    const participantNames = room.participantIds
      .map(id => getUserById(id)?.username)
      .filter(name => !!name)
      .join(', ');

    return participantNames || 'My Chat';
  }
}