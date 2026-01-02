import { Injectable } from '@angular/core';

export interface Book {
  id: number;
  title: string;
  image: string;
  available: boolean;
  takenBy?: string;
}


@Injectable({ providedIn: 'root' })
export class BookService {

  books: Book[] = [
    {
      id: 1,
      title: 'Java Basics',
      image: '',
      available:true
    },
    {
      id: 2,
      title: 'Spring Boot',
      image: '',
      available: true
    },
    {
      id: 3,
      title: 'Angular Guide',
      image: '',
      available: true
    }
  ];

  getBooks() {
    return this.books;
  }

  addBook(title: string, image: string) {
    this.books.push({
      id: Date.now(), title, image,
      available: true
    });
  }

  updateBook(id: number, title: string, image: string) {
    const book = this.books.find(b => b.id === id);
    if (book) {
      book.title = title;
      book.image = image;
    }
  }

  takeBook(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book && book.available) {
      book.available = false;
    
    }
  }

  returnBook(id: number) {
    const book = this.books.find(b => b.id === id);
    if (book && !book.available) {
      book.available = true;
      book.takenBy = undefined;
    }
  }

  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
  }
}
