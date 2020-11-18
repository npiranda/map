import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/book.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-single-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  name: string;

  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.name = this.authService.user;
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }
}


