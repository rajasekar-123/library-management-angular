import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type Role = 'USER' | 'ADMIN';

export interface User {
    email: string;
    role: Role;
    name?: string;
    phone?: string;
    dob?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private router: Router) { }


    login(email: string, password: string): boolean {

        let user: User | null = null;

        if (email === 'admin@gmail.com' && password === 'admin123') {
            user = { email, role: 'ADMIN' };
        }
        else if (email === 'user@gmail.com' && password === 'user123') {
            user = { email, role: 'USER' };
        }
        else {
        
            const signupUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = signupUsers.find((u: any) =>
                u.email === email && u.password === password
            );

            if (foundUser) {
                user = {
                    email: foundUser.email,
                    role: foundUser.role,
                    name: foundUser.name,
                    phone: foundUser.phone,
                    dob: foundUser.dob
                };
            }
        }

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/dashboard']);
            return true;
        }
        return false;
    }


    signup(email: string, password: string, name: string, phone: string, dob: string): boolean {

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
        const user = this.getCurrentUser();
        return user?.role === 'ADMIN';
    }

    getCurrentUser(): User | null {
        return JSON.parse(localStorage.getItem('user') || 'null');
    }


    getAllUsers(): User[] {

        const currentUser = this.getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return [];
        }

  
        const signupUsers = JSON.parse(localStorage.getItem('users') || '[]');

        const defaultUsers: User[] = [
            { email: 'admin@gmail.com', role: 'ADMIN' },
            { email: 'user@gmail.com', role: 'USER' }
        ];


        const allUsers = [...defaultUsers];
        signupUsers.forEach((signupUser: any) => {
            if (!allUsers.find(u => u.email === signupUser.email)) {
                allUsers.push({ email: signupUser.email, role: signupUser.role });
            }
        });

        return allUsers;
    }

    getTotalUsers(): number {
        return this.getAllUsers().length;
    }
}
