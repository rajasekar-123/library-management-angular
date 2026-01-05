import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { BookTransaction } from '../../../shared/models/book-transaction.model';

@Component({
    selector: 'app-returned-books-page',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, RouterModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <mat-icon>assignment_return</mat-icon>
          <div>
            <h1>Transaction History</h1>
            <p>View all book return records</p>
          </div>
        </div>
        <button mat-flat-button color="primary" routerLink="/dashboard">
          <mat-icon>dashboard</mat-icon>
          Back to Dashboard
        </button>
      </div>

      <mat-card class="content-card">
        <div class="table-container">
          <table mat-table [dataSource]="returnedTransactions" class="transactions-table">
            
            <ng-container matColumnDef="book">
              <th mat-header-cell *matHeaderCellDef> Book Title </th>
              <td mat-cell *matCellDef="let t"> 
                <div class="book-cell">
                  <mat-icon>menu_book</mat-icon>
                  <span>{{ t.bookTitle }}</span>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="user">
              <th mat-header-cell *matHeaderCellDef> Returned By </th>
              <td mat-cell *matCellDef="let t"> {{ t.userEmail }} </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef> Return Date </th>
              <td mat-cell *matCellDef="let t"> {{ t.returnDate | date:'medium' }} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let t">
                <span class="status-pill returned">RETURNED</span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell no-data" colspan="4">
                <div class="empty-state">
                  <mat-icon>history</mat-icon>
                  <p>No return transactions found.</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </mat-card>
    </div>
  `,
    styles: [`
    .page-container {
      padding: 40px;
      min-height: 100vh;
      background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
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
      color: #ec4899;
    }
    .header-content h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      color: #831843;
    }
    .header-content p {
      margin: 4px 0 0 0;
      color: #9d174d;
      font-size: 16px;
    }
    .content-card {
      border-radius: 24px;
      padding: 0;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(236, 72, 153, 0.1);
    }
    .table-container {
      width: 100%;
      overflow-x: auto;
    }
    .transactions-table {
      width: 100%;
      background: transparent;
    }
    th.mat-header-cell {
      background: #fdf2f8;
      color: #831843;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 20px;
    }
    td.mat-cell {
      padding: 20px;
      color: #334155;
      border-bottom: 1px solid #fce7f3;
    }
    .book-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }
    .book-cell mat-icon {
      color: #ec4899;
    }
    .status-pill {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 800;
    }
    .status-pill.returned {
      background: #10b981;
      color: white;
    }
    .no-data {
      height: 300px;
    }
    .empty-state {
      text-align: center;
      color: #94a3b8;
    }
    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }
  `]
})
export class ReturnedBooksComponent implements OnInit {
    returnedTransactions: BookTransaction[] = [];
    displayedColumns: string[] = ['book', 'user', 'date', 'status'];

    constructor(private bookService: BookService) { }

    ngOnInit() {
        const all = this.bookService.getAllTransactions();
        this.returnedTransactions = all.filter(t => t.status === 'RETURNED');
    }
}
