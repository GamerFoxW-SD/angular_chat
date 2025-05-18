import { inject, Injectable } from '@angular/core';
import { Message } from '../models/fire-messages.model';
import { User } from '../models/fire-user.model';
import { ChatRoom } from '../models/fire-rooms.model';

import { Router } from '@angular/router';

import { newMessage } from '../models/firabase-newMessage.model';
import { AuthService } from './auth.service';

import { docData ,addDoc, collection, doc, Firestore, getDocs} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';


  @Injectable({
    providedIn: 'root'
  })
  export class ChatService {
   
    constructor( private authService: AuthService, private router: Router,private firestore: Firestore) {}

    private rooms: ChatRoom[] = []; // Szobák tömbje
    private messages: Message[] = []; // Üzenetek tömbje
    private user:User = { id: "", username: '' }; // Alapértelmezett felhasználó
    private usersT: User[] = []; // Felhasználók tömbje




async fetchUsers(): Promise<void> {
  try {
    const userCollection = collection(this.firestore, 'User');
    const snapshot = await getDocs(userCollection);

    this.usersT = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        username: data.nev || 'Ismeretlen'
      };
    })as User[] ;

    console.log('Felhasználók betöltve:', this.usersT);
  } catch (error) {
    console.error('Hiba a felhasználók lekérésekor:', error);
  }
}

getUsersT(): User[] {
  return this.usersT;
}


  /*getUserById(userId: any): Observable<any> {
    const userDocRef = doc(this.firestore, `User/${userId}`);
    return docData(userDocRef); // Visszatér egy Observable, ami figyeli a dokumentumot
  }*/
   
async setUser(email: string, pass: string): Promise<void> {
    try {
    await this.fetchRooms().then(() => {
      console.log('Szobák betöltve:', this.rooms);
    });
   await this.fetchMessages().then(() => {
      console.log('Üzenetek betöltve:', this.messages);
    } );
   await    this.fetchUsers().then(() => {
      console.log('Felhasználók betöltve:', this.usersT);
    });
      
    this.authService.login(email.trim(), pass).then(user => {
  console.log('Sikeres bejelentkezés');
  
  this.user.id = user.user.uid; // Az aktuális felhasználó ID-ja

  this.user.username = this.getUserName(this.user.id); // Az aktuális felhasználó neve
    
 
    this.router.navigate(['/chat-list']); // akkor megyünk tovább, ha már megvan az adat
  
}).catch(error => {
  console.error('Hiba a bejelentkezés során:', error);
});

     } catch (error) {
      console.error('Bejelentkezési hiba:', error);
      // Itt adhatsz visszajelzést is a felhasználónak pl. alerttel
    }
}

 getUser(): User {
    return this.user;
  }
  

  

async fetchRooms(): Promise<void> {
    try {
      const roomCollection = collection(this.firestore, 'room');
      const snapshot = await getDocs(roomCollection);

      this.rooms = snapshot.docs.map(doc => {
        const data = doc.data() as any;

        return {
          id: doc.id,
          name: data.nev,
          participantIds: data.users,
        } as ChatRoom;
      });

      console.log('Szobák betöltve:', this.rooms);
    } catch (error) {
      console.error('Hiba a szobák lekérésekor:', error);
    }
  }

  getChatRoomsForCurrentUser(): ChatRoom[] {
    console.log('Aktuális felhasználó:', this.user);
      return this.rooms.filter(room =>
        room.participantIds.includes(String(this.user.id).trim()) // Szobák szűrése az aktuális felhasználó alapján,
        // Szobák szűrése az aktuális felhasználó alapján
      );
    }

  getChatRoomById(id: string): ChatRoom | undefined {
    return this.rooms.find(room => room.id === id);

  }

 getChatRooms(): ChatRoom[] {
    return this.rooms;
  }


   async fetchMessages(): Promise<void> {
    try {
      const messageCollection = collection(this.firestore, 'messages');
      const snapshot = await getDocs(messageCollection);

      this.messages = snapshot.docs.map(doc => {
        const data = doc.data() as any;

        return {
          id: doc.id,
          chatRoomId: data.room_id,
          senderId: data.kuldo,
          content: data.uzenet,
          timestamp: data.timestamp ? data.timestamp.toDate() : null // Firestore Timestamp → JS Date
        } as Message;
      });

      console.log('Üzenetek betöltve:', this.messages);
    } catch (error) {
      console.error('Hiba az üzenetek lekérésekor:', error);
    }
  }

  getMessages(): Message[] {
    return this.messages;
  }

  sendMessage(roomId: string, content: string): void {
 
  const newMsgRef :Omit<newMessage, 'id'> = {
    room_id: roomId,
    kuldo: this.user.id,
    uzenet: content,
    date: new Date()
  };

  const messagesRef = collection(this.firestore, 'messages');
  addDoc(messagesRef, newMsgRef)
    .then(docRef => {
      console.log('Üzenet mentve Firestore-ba, id:', docRef.id);
      // opcionálisan hozzáadhatod a lokális tömbhöz is
      this.messages.push({ id: docRef.id,
    chatRoomId: roomId,
    senderId: this.user.id,
    content,
    timestamp: new Date()
   }as Message);
    })
    .catch(error => {
      console.error('Hiba az üzenet mentésekor:', error);
    });
}

getMessagesForRoom(roomId: string): Message[] {
      return this.messages.filter(msg => msg.chatRoomId === roomId);
    }

  

getUserName(id: string): string {
  console.log('Keresett ID:', id);
  console.log('Felhasználók:', this.usersT);
  const u = this.usersT.find(u => u.id == id);

  return u ? u.username : 'Ismeretlen';
}

  getUserById(id: string): User | undefined {
    return this.getUsersT().find(u => u.id === id);
  }
  }
  
  