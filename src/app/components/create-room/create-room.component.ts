
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { RouterModule } from '@angular/router';

import { MatModule } from '../../module/mat.module';
import {MatButtonModule} from  '@angular/material/button' ;
import {MatCardModule} from  '@angular/material/card' ;
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-room',
  imports: [MatModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {
roomForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.chatService.getUser().id=="") {
      this.router.navigate(['/login']);
    }
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      users: [[]]  // egyelőre üres lista, később bővíthető
    });
  }

  async createRoom() {
  

  this.isSubmitting = true;

  try {
    const currentUserId = this.chatService.getUser()?.id;
    if (!currentUserId) throw new Error('Nem található bejelentkezett felhasználó.');

    const roomData = {
      nev: this.roomForm.value.name,
      users: [currentUserId]  // Csak a belépett user ID-ja van benne
    };

    const roomRef = collection(this.firestore, 'room');
    await addDoc(roomRef, roomData);

    alert('Chat szoba sikeresen létrehozva!');
    this.roomForm.reset();
    this.router.navigate(['/chat-list']);  // Navigálás a szobák listájára
  } catch (error) {
    console.error('Hiba a szoba létrehozásakor:', error);
    alert('Hiba történt!');
  } finally {
    this.isSubmitting = false;
  }
}

}
