import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-user-list-page',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, RouterModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <mat-icon>group</mat-icon>
          <div>
            <h1>User Management</h1>
            <p>View and manage all registered users</p>
          </div>
        </div>
        <button mat-flat-button color="primary" routerLink="/dashboard">
          <mat-icon>dashboard</mat-icon>
          Back to Dashboard
        </button>
      </div>

      <mat-card class="content-card">
        <div class="users-list">
          <div *ngFor="let user of users" class="user-item">
            <div class="user-avatar">
              <mat-icon>person</mat-icon>
            </div>
            <div class="user-info">
              <div class="name-row">
                <strong>{{ user.name || user.email.split('@')[0] }}</strong>
                <span class="user-role" [class.admin]="user.role === 'ADMIN'">
                  {{ user.role }}
                </span>
              </div>
              <span class="user-email">{{ user.email }}</span>
              <div class="user-details" *ngIf="user.phone || user.dob">
                <span *ngIf="user.phone"><mat-icon>phone</mat-icon> {{ user.phone }}</span>
                <span *ngIf="user.dob"><mat-icon>cake</mat-icon> {{ user.dob }}</span>
              </div>
            </div>
          </div>
          
          <div *ngIf="users.length === 0" class="empty-state">
            <mat-icon>person_off</mat-icon>
            <p>No users found in the system.</p>
          </div>
        </div>
      </mat-card>
    </div>
  `,
    styles: [`
    .page-container {
      padding: 40px;
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
      color: #6366f1;
    }
    .header-content h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      color: #1e293b;
    }
    .header-content p {
      margin: 4px 0 0 0;
      color: #64748b;
      font-size: 16px;
    }
    .content-card {
      border-radius: 24px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }
    .users-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }
    .user-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px;
      border-radius: 16px;
      background: white;
      border: 1px solid #f1f5f9;
      transition: all 0.3s ease;
    }
    .user-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
      border-color: #6366f1;
    }
    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6366f1;
    }
    .user-avatar mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .name-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .name-row strong {
      font-size: 18px;
      color: #1e293b;
    }
    .user-email {
      font-size: 14px;
      color: #64748b;
    }
    .user-role {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      background: #10b981;
      color: white;
    }
    .user-role.admin {
      background: #ef4444;
    }
    .user-details {
      display: flex;
      gap: 16px;
      margin-top: 8px;
      font-size: 13px;
      color: #94a3b8;
    }
    .user-details span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .user-details mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px;
      color: #94a3b8;
    }
    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 20px;
    }
  `]
})
export class UserListComponent implements OnInit {
    users: User[] = [];

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.users = this.auth.getAllUsers();
    }
}
