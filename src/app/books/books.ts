import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService, Book } from '../book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule],
  templateUrl: '../books/books.html',
  styleUrl:'../books/books.css'
})
export class Books{
[x: string]: any;


  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchText = '';
  newTitle = '';
  newImage = '';
  editId: number | null = null;
  currentUserEmail = '';

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.currentUserEmail = user.email;
  }




  constructor(
    private bookService: BookService,
    public auth : AuthService
  ) {
    this.books = this.bookService.getBooks();
    this.filteredBooks = this.books;
  }

  search() {
    this.filteredBooks = this.books.filter(b =>
      b.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  add() {
    this.bookService.addBook(this.newTitle, this.newImage);
    this.newTitle = '';
    this.newImage = '';
  }

  edit(book: Book) {
    this.editId = book.id;
    this.newTitle = book.title;
    this.newImage = book.image;
  }

  update() {
    if (this.editId !== null) {
      this.bookService.updateBook(this.editId, this.newTitle, this.newImage);
      this.editId = null;
      this.newTitle = '';
      this.newImage = '';
    }
  }

  delete(id: number) {
    this.bookService.deleteBook(id);
    this.filteredBooks = this.bookService.getBooks();
  }

  take(id: number) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.bookService.takeBook(id, user.email);
  }


  returnBook(id: number) {
    this.bookService.returnBook(id,this.currentUserEmail);
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

}


