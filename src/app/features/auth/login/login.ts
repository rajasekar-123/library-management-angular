import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardActions, MatCard, MatCardSubtitle, MatCardModule } from "@angular/material/card";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardActions, MatCard, MatCardSubtitle, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { }

  login(form: any) {
    if (form.invalid) return;

    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}