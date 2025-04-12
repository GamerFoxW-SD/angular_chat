
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChatService } from '../../services/chat.service';  // importáld a szolgáltatást
import { ChatRoom } from '../../models/chat-rooms.model';
import { Router } from '@angular/router';  // Importáljuk a Router-t
import { RoomNamePipe } from '../../pipes/room-name.pipe';
import { SharedModule } from '../../module/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { MatModule } from '../../module/mat.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-root',
  templateUrl: './chat-list.component.html',
  standalone: true ,
  imports: [SharedModule, RoomNamePipe,MatModule,MatIconModule,MatBadgeModule,MatButtonModule,MatDividerModule,MatListModule], 
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Chatlist implements OnInit {
  chatRooms: ChatRoom[] = [];
  user_id:number=0;


  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    if (this.chatService.getcurrentUserId()<=0) {
      this.router.navigate(['/login']);
    }
    this.loadChatRooms();
   
   
      this.user_id=this.chatService.getcurrentUserId();
    
  }

  loadChatRooms() {
    // Lekérdezzük az aktuális felhasználóhoz tartozó szobákat
    this.chatRooms = this.chatService.getChatRoomsForCurrentUser();
  }

  selectRoom(roomId: number) {
    // Szoba kiválasztása és navigálás az üzenetoldalra
    this.router.navigate(['/chat', roomId]);
  }

  /*getRoomName(room: ChatRoom): string {
    return this.chatService.getRoomName(room);
  }
  getUserById(id: number): User | undefined {
       return this.chatService.getUserById(id);
     }*/

     getUserById = (id: number) => this.chatService.getUserById(id);

     messages_db(chatId:number):Number{
      let messages=this.chatService.getMessagesForRoom(chatId);
      return messages.filter(
        (msg) => msg.chatRoomId === chatId && msg.senderId !== this.user_id
      ).length;

     }

}
