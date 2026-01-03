import { Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard';
import { Books } from '../app/books/books';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'books', component: Books },
    { path: '**', redirectTo: 'login', pathMatch:'full'}
];

