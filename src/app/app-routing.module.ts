import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
//import {ChatComponent} from './components/message-sender/message-sender.component';
import { RegisterComponent } from './auth/register/register.component';
import { Chatlist } from './components/chat-list/chat-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // A login oldal az alapértelmezett
  /*{ path: 'login', component: LoginComponent },
  { path: 'register', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },*/
  { path: 'register', component: RegisterComponent },
  //{ path: 'chat/:roomId', component: ChatComponent }
  { path: 'chat-list', component: Chatlist },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
