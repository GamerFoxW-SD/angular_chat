import { Injectable } from '@angular/core';
import { Message } from '../models/messages.model';
import { User } from '../models/user.model';
import { ChatRoom } from '../models/chat-rooms.model';
import { UserLogin } from '../models/login_user.model';
import { Router } from '@angular/router';


  @Injectable({
    providedIn: 'root'
  })
  export class ChatService {

    constructor( private router: Router) {}


    private users: User[] = [
      { id: 1, username: 'Anna' },
      { id: 2, username: 'Béla' },
      { id: 3, username: 'Cézár' }
    ];

    private usersLogin: UserLogin[] = [
      { id: 1, email: 'anna@asd.asd' ,pass:"pass123"},
      { id: 2, email: 'bela@asd.asd' ,pass:"pass123"},
      { id: 3, email: 'cezar@asd.asd' ,pass:"pass123"}
    ];
  
    private chatRooms: ChatRoom[] = [
      { id: 1, participantIds: [1, 2] },
      { id: 2,name:"ures", participantIds: [1, 3] },
      { id: 3, participantIds: [1, 2, 3] }
    ];
  
    private messages: Message[] = [
      {
        id: 1,
        chatRoomId: 1,
        senderId: 1,
        content: 'Szia Béla!',
        timestamp: new Date()
      },
      {
        id: 2,
        chatRoomId: 1,
        senderId: 2,
        content: 'Szia Anna!',
        timestamp: new Date()
      }
    ];
  
    private currentUserId: number = 0; // Alapértelmezett felhasználó az 1-es ID

    setUser(email:string,pass:string){
      let item=this.usersLogin;
        for (let index = 0; index < item.length; index++) {
          if(item[index].email===email.trim()){

            if(item[index].pass===pass){
              this.currentUserId=item[index].id;
              this.router.navigate(['/chat-list']);
            }
          }
          
        }
    }

    getcurrentUserId():number{
      return this.currentUserId;
     }
  
    setCurrentUser(id: number) {
      this.currentUserId = id;
    }
  
    getChatRoomsForCurrentUser(): ChatRoom[] {
      return this.chatRooms.filter(room =>
        room.participantIds.includes(this.currentUserId)
      );
    }
  
    getCurrentUserId(): number {
      return this.currentUserId;
    }
  
    getChatRooms(): ChatRoom[] {
      return this.chatRooms;
    }
  
    getMessagesForRoom(roomId: number): Message[] {
      return this.messages.filter(msg => msg.chatRoomId === roomId);
    }
  
    sendMessage(roomId: number, content: string): void {
      const newMsg: Message = {
        id: this.messages.length + 1,
        chatRoomId: roomId,
        senderId: this.currentUserId,
        content,
        timestamp: new Date()
      };
      this.messages.push(newMsg);
    }
  
    getUserById(id: number): User | undefined {
      return this.users.find(u => u.id === id);
    }

   
    // Új függvény a szoba nevének meghatározására
 /* getRoomName(room: ChatRoom): string {
    // Ha a szobának van neve, akkor azt használjuk
    
    if (room.name!==undefined) {
      return room.name;
    }

    // Ha nincs neve, akkor a résztvevő felhasználók neveit fűzzük össze
    const participantNames = room.participantIds
      .map(id => this.getUserById(id)?.username)
      .filter(name => name)  // Eltávolítja az undefined neveket
      .join(', '); // Az összes nevet összefűzi, vesszővel elválasztva

    return participantNames || 'My Chat';  // Ha nincs résztvevő, akkor alapértelmezett név
  }*/

  getChatRoomById(id: number): ChatRoom | undefined {
    return this.chatRooms.find(room => room.id === id);
  }
  
  
  }
  
