import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';  // importáld a szolgáltatást

import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports:[
    RouterOutlet
   
  ]
})
export class AppComponent {
 /* selectedRoom: ChatRoom | null = null;  // Kiválasztott szoba

  constructor(private chatService: ChatService) {}

  selectRoom(roomId: number) {
    this.selectedRoom = this.chatService.getChatRoomsForCurrentUser().find(room => room.id === roomId) || null;
  }
  getRoomName(room: ChatRoom): string {
    return this.chatService.getRoomName(room);  // Szoba neve a szolgáltatásból
  }*/
}
