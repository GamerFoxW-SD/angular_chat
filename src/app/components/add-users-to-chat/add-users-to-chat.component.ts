
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, doc, updateDoc, collection, getDocs, docData } from '@angular/fire/firestore';

import { ChatRoom } from '../../models/fire-rooms.model';
import { User } from '../../models/fire-user.model';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';

import { MatModule } from '../../module/mat.module';
import {MatButtonModule} from  '@angular/material/button' ;
import {MatCardModule} from  '@angular/material/card' ;
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-users-to-chat',
  imports: [MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatModule, MatListModule, CommonModule],
  templateUrl: './add-users-to-chat.component.html',
  styleUrl: './add-users-to-chat.component.scss'
})
export class AddUsersToChatComponent implements OnInit {
  form!: FormGroup;
  chatRoomId!: string;
  chatRoom!: ChatRoom;

  availableUsers: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private chatService: ChatService,
    private firestore: Firestore
    , private router: Router
  ) {}

  ngOnInit(): void {
    if (this.chatService.getUser().id=="") {
      this.router.navigate(['/login']);
    }
    this.form = this.fb.group({ selectedUsers: [[]] });

    const id = this.route.snapshot.paramMap.get('id');
    console.log('Chat szoba ID:', id);
    if (id!== null) {
      console.log('Chat');
      this.chatRoomId = id;
      this.loadChatRoom();
    }
  }

  async loadChatRoom() {
  const chatDocRef = doc(this.firestore, `room/${this.chatRoomId}`);

  try {
    const rawData = await firstValueFrom(docData(chatDocRef));

    if (!rawData) {
      console.error('A chat szoba nem található a Firestore-ban.');
      return;
    }

    this.chatRoom = {
      id: this.chatRoomId,
      name: rawData['name'],
      participantIds: rawData['users'] ?? []
    };

    this.availableUsers = this.chatService.getUsersT().filter(
      user => !this.chatRoom.participantIds.includes(user.id)
    );
  } catch (err) {
    console.error('Hiba történt a szoba betöltésekor:', err);
  }
}


  async addUsersToChat() {
    const selectedUserIds: string[] = this.form.value.selectedUsers;

    if (!selectedUserIds.length) return;

    const updatedParticipantIds = [
      ...this.chatRoom.participantIds,
      ...selectedUserIds
    ];

    const chatDocRef = doc(this.firestore, `room/${this.chatRoomId}`);
    await updateDoc(chatDocRef, {
      users: updatedParticipantIds
    });

    alert('Felhasználók sikeresen hozzáadva!');
    this.router.navigate(['/chat', this.chatRoomId]); // Navigálás a szobához
  }
}
