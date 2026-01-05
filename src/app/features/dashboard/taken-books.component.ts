import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../shared/models/book.model';

@Component({
    selector: 'app-taken-books',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    template: `
    <div class="header">
      <mat-icon>library_add</mat-icon>
      <h2>Taken Books ({{ books.length }})</h2>
    </div>
    <div class="books-list">
      <div *ngFor="let book of books" class="book-item">
        <mat-icon>menu_book</mat-icon>
        <div class="book-info">
          <strong>{{ book.title }}</strong>
          <span class="taken-by">Taken by: {{ book.takenByName || book.takenBy }}</span>
        </div>
        <span class="status-badge">TAKEN</span>
      </div>
      <div *ngIf="books.length === 0" class="empty-state">
        <mat-icon>check_circle</mat-icon>
        <p>All books are available!</p>
      </div>
    </div>
    <div class="actions" *ngIf="showClose">
      <button mat-raised-button color="primary" (click)="close.emit()">Close</button>
    </div>
  `,
    styles: [`
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      color: #f59e0b;
    }
    h2 {
      margin: 0;
      font-weight: 700;
    }
    .books-list {
      max-height: 400px;
      overflow-y: auto;
      padding: 4px;
    }
    .book-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%);
      border-left: 4px solid #f59e0b;
      transition: all 0.3s ease;
    }
    .book-item:hover {
      transform: translateX(8px);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
    }
    .book-item mat-icon {
      color: #f59e0b;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .book-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .book-info strong {
      font-size: 16px;
      color: #1e293b;
    }
    .taken-by {
      font-size: 13px;
      color: #64748b;
    }
    .status-badge {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      background: #f59e0b;
      color: white;
    }
    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #64748b;
    }
    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #10b981;
      margin-bottom: 16px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `]
})
export class TakenBooksComponent {
    @Input() books: Book[] = [];
    @Input() showClose = false;
    @Output() close = new EventEmitter<void>();
}
