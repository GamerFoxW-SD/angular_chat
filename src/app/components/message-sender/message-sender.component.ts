import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/messages.model';
import { ChatRoom } from '../../models/chat-rooms.model';
import { ActivatedRoute,Router  } from '@angular/router';
import { SharedModule } from '../../module/shared.module';
import { RoomNamePipe } from '../../pipes/room-name.pipe';
import { MatModule } from '../../module/mat.module';
import {MatButtonModule} from  '@angular/material/button' ;
import {MatCardModule} from  '@angular/material/card' ;
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';






@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss'],
  standalone: true ,
    imports: [SharedModule, RoomNamePipe,MatCardModule, MatButtonModule,MatModule,MatInputModule,MatFormFieldModule,FormsModule]
})
export class MessageSenderComponent implements OnInit {
 selectedRoom: number= 0;  // A kiválasztott szoba
  newMessage: string = '';  // Az új üzenet
  messages: Message[] = [];  // Az üzenetek listája

 room:ChatRoom={
  id:this.selectedRoom,
  name:"Ez a chat nem létezik",
  participantIds:[]
 };
  

  constructor(private chatService: ChatService,private router:ActivatedRoute,private router_n: Router  ) {
  }
  

  ngOnInit(): void {

    if (this.chatService.getcurrentUserId()<=0) {
      this.router_n.navigate(['/login']);
    }

    this.router.paramMap.subscribe(params => {
      const id = params.get('roomId'); // vagy 'id', attól függően hogyan van definiálva a route
      if (id!==undefined) {
        this.selectedRoom =Number(id);
        const r=this.getChatRoomById(this.selectedRoom);
        if(r!==undefined){
        this.room=r;

       }
        this.loadMessages();

      }
      
    });
    
  }

 

  getChatRoomById(id: number): ChatRoom | undefined {
    return this.chatService.getChatRoomById(id);
  }
  
  

  // Üzenet küldése
  sendMessage() {
    if (this.newMessage.trim() && this.selectedRoom>0) {
      let m=this.getChatRoomById(this.selectedRoom);
      if(m!==undefined){
        this.chatService.sendMessage(m.id, this.newMessage);
      }
     
      this.newMessage = '';  // Törli a beviteli mezőt
      this.loadMessages();  // Frissíti az üzeneteket
    }
  }

  // A feladó felhasználó nevének lekérése
 /* getUserById(id: number) {
    return this.chatService.getUserById(id);
  }*/
    getUserById = (id: number) => this.chatService.getUserById(id);
 /* getRoomName(room: ChatRoom): string {
    return this.chatService.getRoomName(room);
  }*/
 
  // Az üzenetek betöltése a kiválasztott szobához
  loadMessages() {
    if (this.selectedRoom>0) {
      let m=this.getChatRoomById(this.selectedRoom);
      if(m!==undefined){
        this.messages = this.chatService.getMessagesForRoom(m.id);
      }
     
    }
  }

  getcurrentUserId():number{
    return this.chatService.getcurrentUserId();
   }
  
}
