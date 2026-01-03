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

  private storagekey = 'books';



  books: Book[] = [];

  constructor() {
    const storedbooks = localStorage.getItem(this.storagekey)
  
    if (storedbooks) {
     this.books = JSON.parse(storedbooks)
       }
    else {
      this.books = [
        {
          id: 1,
          title: 'Java Basics',
          image: 'no-book.png',
          available: true
        },
        {
          id: 2,
          title: 'Spring Boot',
          image: 'no-book.png',
          available: true
        },
        {
          id: 3,
          title: 'Angular Guide',
          image: 'no-book.png',
          available: true
        },
        {
          id: 4,
          title: 'React Guide',
          image: 'no-book.png',
          available: true
        },
        {
          id: 5,
          title: 'Javascript Guide',
          image: 'no-book.png',
          available: true
        },
        {
          id: 6,
          title: 'AWS Guide',
          image: 'no-book.png',
          available: true
        },
        {
          id: 7,
          title: 'System Design',
          image: 'no-book.png',
          available: true
        },
        {
          id: 8,
          title: 'SDLC Learning  Guide',
          image: 'no-book.png',
          available: true
        },
        {
          id: 9,
          title: 'Microservices and Architecture',
          image: 'no-book.png',
          available: true
        },
        {
          id: 10,
          title: 'Deployment Things',
          image: 'no-book.png',
          available: true
        },
    
      ];
      this.save();
    }
  }

  save()
  {
    localStorage.setItem(this.storagekey, JSON.stringify(this.books));
  }

 
  getBooks() {
    return this.books;
  }

  addBook(title: string, image: string) {
    this.books.push({
      id: Date.now(), title, image,
      available: true
    });
    this.save();
  }

  updateBook(id: number, title: string, image: string) {
    const book = this.books.find(b => b.id === id);
    if (book) {
      book.title = title;
      book.image = image;
    }
    this.save();
  }

  takeBook(id: number, useremail: string) {
    const book = this.books.find(b => b.id === id);
    if (book && book.available) {
      book.available = false;
      book.takenBy = useremail;
    }
    this.save();
  }

  

  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
    this.save();
  }

  getTotalBooks(): number {
    return this.books.length;
  }

  getAvailableBooksCount(): number {
    return this.books.filter(b => b.available).length;
  }

  getTakenBooksCount(): number {
    return this.books.filter(b => !b.available).length;
  }


  getBooksTakenByUser(email: string): number {
    return this.books.filter(
      book => book.takenBy === email
    ).length;
  }

  returnBook(id: number, userEmail: string) {
    const book = this.books.find(b => b.id === id);

    if (book && !book.available && book.takenBy === userEmail) {
      book.available = true;
      book.takenBy = undefined;
      this.save();
    }
  }



  
}
