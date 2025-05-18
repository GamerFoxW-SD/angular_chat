import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { MatModule } from '../../module/mat.module';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.scss',
  standalone: true ,
  imports: [MatModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule]
})
export class RegisterComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
 email_text = '';
  password_text = '';
nev_text = '';
  errorMessage = signal('');

  constructor(private auth: AuthService,private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  register() {
    /*this.auth.register(this.email_text, this.password_text)
      .then(user => {
        console.log('Regisztráció sikeres:', user);
        // Például: átirányítás főoldalra
        //this.auth.navigate(['/login']);
         
      })
      .catch(error=> {
        console.error('Hiba a regisztráció során:', error.message);
      });*/
      this.auth.registerUser(this.email_text, this.password_text, this.nev_text)
      .then(() => {
        this.router.navigate(['/login']);
        console.log('Sikeres regisztráció és Firestore mentés');
      })
      .catch(error => {
        console.error('Regisztrációs hiba:', error);
      }
      );
  }
}


