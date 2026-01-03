import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ ADD THIS
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { BookService } from '../book';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    CommonModule,    
    RouterModule,
      MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl:'./dashboard.css'
})
export class DashboardComponent implements OnInit {


  totalBooks = 0;
  availableBooks = 0;
  takenBooks = 0;
  totalUsers = 0;
  returnedbooks = 0;
  takenbyme = 0;

  constructor(public auth: AuthService,private bookservice:BookService) { }
  user = JSON.parse(localStorage.getItem('user') || 'null');

  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user')!);
    this.totalBooks = this.bookservice.getTotalBooks();
    this.availableBooks = this.bookservice.getAvailableBooksCount();
    this.takenBooks = this.bookservice.getTakenBooksCount();
    this.totalUsers = this.auth.getTotalUsers();
    this.returnedbooks = this.bookservice.getTakenBooksCount();
    this.takenbyme =
      this.bookservice.getBooksTakenByUser(user.email);

    if (this.auth.isAdmin()) {
      this.totalUsers = this.auth.getTotalUsers();
    }
  }



  logout() {
    this.auth.logout();
  }
}
