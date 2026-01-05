import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { BooksComponent } from './features/books/books';
import { LoginComponent } from './features/auth/login/login';
import { SignupComponent } from './features/auth/signup/signup';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'books', component: BooksComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

