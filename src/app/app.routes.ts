import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { BooksComponent } from './features/books/books';
import { LoginComponent } from './features/auth/login/login';
import { SignupComponent } from './features/auth/signup/signup';
import { authGuard } from './core/auth/auth.guard';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { TakenBooksComponent } from './features/admin/taken-books/taken-books.component';
import { ReturnedBooksComponent } from './features/admin/returned-books/returned-books.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'books', component: BooksComponent, canActivate: [authGuard] },
    { path: 'admin/users', component: UserListComponent, canActivate: [authGuard] },
    { path: 'admin/taken-books', component: TakenBooksComponent, canActivate: [authGuard] },
    { path: 'admin/returned-books', component: ReturnedBooksComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

