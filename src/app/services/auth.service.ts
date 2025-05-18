import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth);
  //private firestore: Firestore = inject(Firestore);

    constructor(private afAuth: Auth, private router: Router,private firestore: Firestore) { }

    /*register(email: string, password: string) {
        return createUserWithEmailAndPassword(this.afAuth, email, password);
    }*/

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.afAuth, email, password);
    }

    logout() {
        return this.afAuth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    getUser() {
        return authState(this.afAuth).subscribe(user => {
            if (user) { return user };
            this.router.navigate(['/login']);
            return null;

        })
    }

    async registerUser(email: string, password: string, username: string): Promise<void> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email.trim(), password);
      const user = credential.user;
      console.log(user.uid);

      // Firestore dokumentum létrehozása a felhasználóhoz
      await setDoc(doc(this.firestore, 'User', user.uid), {
        nev: username
        
      });

      console.log('Sikeres regisztráció és Firestore mentés');

    } catch (error) {
      console.error('Regisztrációs hiba:', error);
    }
  }
}
