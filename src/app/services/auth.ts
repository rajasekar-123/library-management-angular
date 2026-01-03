import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type Role = 'USER' | 'ADMIN';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private router: Router) { }

    login(email: string, password: string): boolean {

        let user = null;

        if (email === 'admin@gmail.com' && password === 'admin123') {
            user = { email, role: 'ADMIN' as Role };
        }
        else if (email === 'user@gmail.com' && password === 'user123') {
            user = { email, role: 'USER' as Role };
        }

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/dashboard']);
            return true;
        }
        return false;
    }

    signup(email: string, password: string): boolean {

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const exists = users.find((u: any) => u.email === email);
        if (exists) {
            return false;
        }


        users.push({
            email,
            password,
            role: 'USER'
        });

        localStorage.setItem('users', JSON.stringify(users));

        return true;
    }


    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);   
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('user');
    }

    isAdmin(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user?.role === 'ADMIN';
    }

    getTotalUsers(): number {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.length;
    }

}
