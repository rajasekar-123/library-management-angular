import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../services/auth';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signup(form: any) {
    if (form.invalid) return;

    const success = this.authService.signup(this.email, this.password);

    if (success) {
      localStorage.setItem(
        'user',
        JSON.stringify({ email: this.email, role: 'USER' })
      );

      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Email already exists';
      alert("error")
    }
  }
}
