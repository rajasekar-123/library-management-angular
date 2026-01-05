import { Injectable } from '@angular/core';
import { BookTransaction } from '../../shared/models/book-transaction.model';

@Injectable({ providedIn: 'root' })
export class SampleDataService {


    createSampleTransactions(): void {
        const sampleTransactions: BookTransaction[] = [
            {
                bookId: 1,
                bookTitle: 'Java Basics',
                userEmail: 'user@gmail.com',
                takenDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                returnDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                status: 'RETURNED'
            },
            {
                bookId: 3,
                bookTitle: 'Angular Guide',
                userEmail: 'user@gmail.com',
                takenDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), 
                status: 'TAKEN'
            },
            {
                bookId: 5,
                bookTitle: 'Javascript Guide',
                userEmail: 'admin@gmail.com',
                takenDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), 
                returnDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'RETURNED'
            }
        ];

        localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
        console.log('Sample transactions created!');
    }


    clearTransactions(): void {
        localStorage.removeItem('transactions');
        console.log('Transactions cleared!');
    }
}
