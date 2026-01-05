export interface BookTransaction {
    bookId: number;
    bookTitle: string;
    userEmail: string;
    takenDate: string;
    returnDate?: string;
    status: 'TAKEN' | 'RETURNED';
}
