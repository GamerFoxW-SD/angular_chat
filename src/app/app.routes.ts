import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {Chatlist} from './components/chat-list/chat-list.component'
import {MessageSenderComponent} from './components/message-sender/message-sender.component'
import {CreateRoomComponent} from './components/create-room/create-room.component'
import { AddUsersToChatComponent } from './components/add-users-to-chat/add-users-to-chat.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },// Példa kezdő útvonal
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chat-list', component: Chatlist },
  { path: 'register', component: RegisterComponent },
  { path: 'chat-create', component: CreateRoomComponent },
  { path: 'add-users/:id', component: AddUsersToChatComponent },

  { path: 'chat/:roomId', component: MessageSenderComponent }

];
