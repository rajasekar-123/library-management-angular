import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResetDataService {

 
    clearAllData(): void {
        localStorage.removeItem('books');
        localStorage.removeItem('users');
        localStorage.removeItem('transactions');
        localStorage.removeItem('user');
        console.log(' All localStorage data cleared!');
    }

    
    resetToDefaults(): void {
        this.clearAllData();

       
        const defaultBooks = [
            { id: 1, title: 'Java Basics', image: 'no-book.png', available: true },
            { id: 2, title: 'Spring Boot', image: 'no-book.png', available: true },
            { id: 3, title: 'Angular Guide', image: 'no-book.png', available: true },
            { id: 4, title: 'React Guide', image: 'no-book.png', available: true },
            { id: 5, title: 'Javascript Guide', image: 'no-book.png', available: true },
            { id: 6, title: 'AWS Guide', image: 'no-book.png', available: true },
            { id: 7, title: 'System Design', image: 'no-book.png', available: true },
            { id: 8, title: 'SDLC Learning Guide', image: 'no-book.png', available: true },
            { id: 9, title: 'Microservices and Architecture', image: 'no-book.png', available: true },
            { id: 10, title: 'Deployment Things', image: 'no-book.png', available: true }
        ];

        localStorage.setItem('books', JSON.stringify(defaultBooks));

       
        localStorage.setItem('users', JSON.stringify([]));
        localStorage.setItem('transactions', JSON.stringify([]));
        console.log(' Application reset to default state!');
        console.log(' 10 default books restored');
        console.log(' Hardcoded users: admin@gmail.com, user@gmail.com');
        console.log('No transactions');
    }
}
