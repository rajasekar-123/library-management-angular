import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../shared/models/book.model';

@Component({
    selector: 'app-taken-books-page',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, RouterModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <mat-icon>library_add</mat-icon>
          <div>
            <h1>Taken Books</h1>
            <p>Books currently issued to readers</p>
          </div>
        </div>
        <button mat-flat-button color="primary" routerLink="/dashboard">
          <mat-icon>dashboard</mat-icon>
          Back to Dashboard
        </button>
      </div>

      <mat-card class="content-card">
        <div class="books-grid">
          <div *ngFor="let book of takenBooks" class="book-card">
            <div class="book-cover">
              <mat-icon>menu_book</mat-icon>
              <div class="status-badge">TAKEN</div>
            </div>
            <div class="book-info">
              <h3>{{ book.title }}</h3>
              <div class="borrower-info">
                <mat-icon>person</mat-icon>
                <span>{{ book.takenByName || book.takenBy }}</span>
              </div>
              <div class="email-info">
                <mat-icon>email</mat-icon>
                <span>{{ book.takenBy }}</span>
              </div>
            </div>
          </div>
          
          <div *ngIf="takenBooks.length === 0" class="empty-state">
            <mat-icon>check_circle</mat-icon>
            <p>All books are currently available in the library!</p>
          </div>
        </div>
      </mat-card>
    </div>
  `,
    styles: [`
    .page-container {
      padding: 40px;
      min-height: 100vh;
      background: linear-gradient(135deg, #fffcf0 0%, #fff7ed 100%);
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    .header-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .header-content mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #f59e0b;
    }
    .header-content h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      color: #7c2d12;
    }
    .header-content p {
      margin: 4px 0 0 0;
      color: #92400e;
      font-size: 16px;
    }
    .content-card {
      border-radius: 24px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(245, 158, 11, 0.1);
    }
    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .book-card {
      border-radius: 20px;
      background: white;
      overflow: hidden;
      border: 1px solid #fee2e2;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    .book-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15);
      border-color: #f59e0b;
    }
    .book-cover {
      height: 160px;
      background: linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .book-cover mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #f59e0b;
    }
    .status-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: #f59e0b;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 800;
    }
    .book-info {
      padding: 24px;
    }
    .book-info h3 {
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
    }
    .borrower-info, .email-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #64748b;
      margin-bottom: 8px;
    }
    .borrower-info mat-icon, .email-info mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #94a3b8;
    }
    .borrower-info span {
      font-weight: 600;
      color: #475569;
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 80px;
      color: #94a3b8;
    }
    .empty-state mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #10b981;
      margin-bottom: 24px;
    }
    .empty-state p {
      font-size: 18px;
      font-weight: 500;
    }
  `]
})
export class TakenBooksComponent implements OnInit {
    takenBooks: Book[] = [];

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.takenBooks = this.bookService.getBooks().filter(b => !b.available);
    }
}
