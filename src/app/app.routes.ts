import { Routes } from '@angular/router';
import { Dashboard } from '../app/dashboard/dashboard';
import { Books } from '../app/books/books';

export const routes: Routes = [

    { path: 'dashboard', component: Dashboard },
    { path: 'books', component: Books },
    { path: '**', redirectTo: '' }
];

