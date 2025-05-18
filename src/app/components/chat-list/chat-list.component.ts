
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChatService } from '../../services/chat.service';  // importáld a szolgáltatást
import { ChatRoom } from '../../models/fire-rooms.model';
import { Router } from '@angular/router';  // Importáljuk a Router-t
import { RoomNamePipe } from '../../pipes/room-name.pipe';
import { SharedModule } from '../../module/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { MatModule } from '../../module/mat.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './chat-list.component.html',
  standalone: true ,
  imports: [SharedModule, RoomNamePipe,MatModule,MatIconModule,MatBadgeModule,MatButtonModule,MatDividerModule,MatListModule,RouterLink], 
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Chatlist implements OnInit {
  chatRooms: ChatRoom[] = [];
  //user_id:number=0;
  user_id:string="";


  constructor(private chatService: ChatService, private router: Router) {}

  /*ngOnInit(): void {
    if (this.chatService.getcurrentUserId()<=0) {
      this.router.navigate(['/login']);
    }
    this.loadChatRooms();
   
   
      this.user_id=this.chatService.getcurrentUserId();
    
  }*/

      ngOnInit(): void {
    if (this.chatService.getUser().id=="") {
      this.router.navigate(['/login']);
    }
    this.loadChatRooms();
   
   
      this.user_id=this.chatService.getUser().id;
    
  }

  loadChatRooms() {
    // Lekérdezzük az aktuális felhasználóhoz tartozó szobákat
    this.chatRooms = this.chatService.getChatRoomsForCurrentUser();
    console.log('Szobák betöltve:', this.chatRooms);
  }

  selectRoom(roomId: string) {
    // Szoba kiválasztása és navigálás az üzenetoldalra
    this.router.navigate(['/chat', roomId]);
  }
  messages_db(chatId:string):Number{
      let messages=this.chatService.getMessagesForRoom(chatId);
      return messages.filter(
        (msg) => msg.chatRoomId === chatId && msg.senderId !== this.user_id
      ).length;

     }

  /*getRoomName(room: ChatRoom): string {
    return this.chatService.getRoomName(room);
  }
  getUserById(id: number): User | undefined {
       return this.chatService.getUserById(id);
     }*/

     /*getUserById = (id: number) => this.chatService.getUserById(id);

     messages_db(chatId:number):Number{
      let messages=this.chatService.getMessagesForRoom(chatId);
      return messages.filter(
        (msg) => msg.chatRoomId === chatId && msg.senderId !== this.user_id
      ).length;

     }*/

}
