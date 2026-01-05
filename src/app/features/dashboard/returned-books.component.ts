import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookTransaction } from '../../shared/models/book-transaction.model';

@Component({
    selector: 'app-returned-books',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    template: `
    <div class="header">
      <mat-icon>assignment_return</mat-icon>
      <h2>Returned Books ({{ transactions.length }})</h2>
    </div>
    <div class="transactions-list">
      <div *ngFor="let transaction of transactions" class="transaction-item">
        <mat-icon>check_circle</mat-icon>
        <div class="transaction-info">
          <strong>{{ transaction.bookTitle }}</strong>
          <span class="user">Returned by: {{ transaction.userEmail }}</span>
          <span class="date">{{ transaction.returnDate | date:'medium' }}</span>
        </div>
        <span class="status-badge">RETURNED</span>
      </div>
      <div *ngIf="transactions.length === 0" class="empty-state">
        <mat-icon>info</mat-icon>
        <p>No returned books yet</p>
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
      color: #ec4899;
    }
    h2 {
      margin: 0;
      font-weight: 700;
    }
    .transactions-list {
      max-height: 400px;
      overflow-y: auto;
      padding: 4px;
    }
    .transaction-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%);
      border-left: 4px solid #ec4899;
      transition: all 0.3s ease;
    }
    .transaction-item:hover {
      transform: translateX(8px);
      box-shadow: 0 4px 12px rgba(236, 72, 153, 0.2);
    }
    .transaction-item mat-icon {
      color: #10b981;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .transaction-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .transaction-info strong {
      font-size: 16px;
      color: #1e293b;
    }
    .user, .date {
      font-size: 13px;
      color: #64748b;
    }
    .status-badge {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      background: #10b981;
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
      color: #94a3b8;
      margin-bottom: 16px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `]
})
export class ReturnedBooksComponent {
    @Input() transactions: BookTransaction[] = [];
    @Input() showClose = false;
    @Output() close = new EventEmitter<void>();
}
