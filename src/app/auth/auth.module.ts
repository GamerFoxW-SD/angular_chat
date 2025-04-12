import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, LoginComponent], // Standalone komponens itt kell importálni
})
export class AuthModule {}
