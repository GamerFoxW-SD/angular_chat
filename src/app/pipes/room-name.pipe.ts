import { Pipe, PipeTransform,inject } from '@angular/core';
import {User} from '../models/fire-user.model'
import {ChatRoom} from '../models/fire-rooms.model'
import { ChatService } from '../services/chat.service';

@Pipe({
  name: 'roomName',
  standalone: true 
})
export class RoomNamePipe implements PipeTransform {

 // constructor(private chatService: ChatService) {}
 private chatService = inject(ChatService);

  transform(room: ChatRoom): string {
    if (room.name !== undefined && room.name !== "" && room.name !== null) {
   
      return room.name;
    }

    let participantNames = room.participantIds
      .map(id => this.chatService.getUserName(id))
      .filter(nev => !!nev)
      .join(', ');


    return participantNames || 'My Chat';
  }
}