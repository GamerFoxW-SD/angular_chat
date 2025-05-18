import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { MatModule } from '../../module/mat.module';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import { ChatService } from '../../services/chat.service';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true ,
    imports: [MatModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,RouterLink], 
})
export class LoginComponent { 

  readonly email = new FormControl('', [Validators.required, Validators.email]);

  email_input:string="";
  pass_input:string="";

  errorMessage = signal('');

  constructor(private chatService: ChatService,private router:Router) {
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

  onLogin(): void {
    /*if (this.chatService.getCurrentUserId() > 0) {
      this.router.navigate(['/chat-list']);
    }*/
    if (this.email_input.trim()) {
      this.chatService.setUser(this.email_input, this.pass_input);
      
      console.log('Bejelentkezett felhasználó:', this.email_input);
    }
  }

  

}
