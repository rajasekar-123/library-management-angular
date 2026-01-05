import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { BookService } from '../../core/services/book.service';
import { SampleDataService } from '../../core/services/sample-data.service';
import { ResetDataService } from '../../core/services/reset-data.service';
import { NotificationService } from '../../core/services/notification.service';
import { BookTransaction } from '../../shared/models/book-transaction.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  user: any;

  totalBooks = 0;
  availableBooks = 0;
  takenBooks = 0;
  totalUsers = 0;
  returnedbooks = 0;
  takenbyme = 0;

  transactions: BookTransaction[] = [];

  allUsers: any[] = [];

  constructor(
    public auth: AuthService,
    private bookservice: BookService,
    private sampleDataService: SampleDataService,
    private resetDataService: ResetDataService,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!this.user) return;
    this.loadStats();
  }

  loadStats() {
    this.totalBooks = this.bookservice.getTotalBooks();
    this.availableBooks = this.bookservice.getAvailableBooksCount();
    this.takenBooks = this.bookservice.getTakenBooksCount();
    this.takenbyme = this.bookservice.getBooksTakenByUser(this.user.email);
    if (this.auth.isAdmin()) {
      this.totalUsers = this.auth.getTotalUsers();

      this.transactions = this.bookservice.getAllTransactions();

      const returnedTransactions =
        this.transactions.filter(t => t.status === 'RETURNED');
      this.returnedbooks = returnedTransactions.length;
    }

    this.allUsers = this.auth.getAllUsers();
  }

  createSampleData() {
    this.sampleDataService.createSampleTransactions();
    this.loadStats();
    this.notification.success('Sample transaction data created!');
  }

  clearSampleData() {
    this.sampleDataService.clearTransactions();
    this.loadStats();
    this.notification.info('All transactions cleared');
  }

  async resetAllData() {
    const confirmed = await this.notification.confirm('⚠️ This will delete ALL data (books, users, transactions) and reset to defaults. Continue?');
    if (confirmed) {
      this.resetDataService.resetToDefaults();
      localStorage.removeItem('user');
      this.notification.success('Application reset successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    }
  }

  onTotalUsersClick() {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/admin/users']);
    }
  }

  onTotalBooksClick() {
    this.router.navigate(['/books']);
    this.notification.info('Viewing all books');
  }

  onTakenBooksClick() {
    this.router.navigate(['/admin/taken-books']);
  }

  onMyBooksClick() {
    this.router.navigate(['/books']);
    this.notification.info(`You have taken ${this.takenbyme} books`);
  }

  onReturnedBooksClick() {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/admin/returned-books']);
    }
  }

  logout() {
    this.auth.logout();
  }
}
