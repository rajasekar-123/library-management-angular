import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../core/auth/auth.service';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    template: `
    <div class="header">
      <mat-icon>group</mat-icon>
      <h2>All Users ({{ users.length }})</h2>
    </div>
    <div class="users-list">
      <div *ngFor="let user of users" class="user-item">
        <mat-icon>person</mat-icon>
        <div class="user-info">
          <strong>{{ user.name || user.email }}</strong>
          <span class="user-email">{{ user.email }}</span>
          <span class="user-role" [class.admin]="user.role === 'ADMIN'">
            {{ user.role }}
          </span>
        </div>
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
      color: #667eea;
    }
    h2 {
      margin: 0;
      font-weight: 700;
    }
    .users-list {
      max-height: 400px;
      overflow-y: auto;
      padding: 4px;
    }
    .user-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%);
      border-left: 4px solid #667eea;
      transition: all 0.3s ease;
    }
    .user-item:hover {
      transform: translateX(8px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }
    .user-item mat-icon {
      color: #667eea;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .user-info strong {
      font-size: 16px;
      color: #1e293b;
    }
    .user-email {
      font-size: 13px;
      color: #64748b;
    }
    .user-role {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      background: #10b981;
      color: white;
      width: fit-content;
    }
    .user-role.admin {
      background: #ef4444;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `]
})
export class UserListComponent {
    @Input() users: User[] = [];
    @Input() showClose = false;
    @Output() close = new EventEmitter<void>();
}
