import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { NgModule } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideFirebaseApp(() => initializeApp({ projectId: "angular-chat-6a328", 
      appId: "1:509159130810:web:bed39a27afec8306d8a483", 
      storageBucket: "angular-chat-6a328.firebasestorage.app", 
      apiKey: "AIzaSyCdTcJlc1HxCDv4FMKbnwxxeqJnbh2mza0", 
      authDomain: "angular-chat-6a328.firebaseapp.com", 
      messagingSenderId: "509159130810" })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()), 
      provideDatabase(() => getDatabase())]
};
