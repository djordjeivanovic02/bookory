import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, Like } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dtos/book.dto';
import { from, Observable, switchMap } from 'rxjs';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(Author)
        private authorRepository: Repository<Author>
    ){}

    create(bookData: CreateBookDto): Observable<Book> {
        return from(this.authorRepository.findOneBy({ id: bookData.author })).pipe(
          switchMap((author) => {
            if (!author) {
              throw new Error('Author not found');
            }
    
            const book = new Book();
            book.title = bookData.title;
            book.description = bookData.description;
            book.image = bookData.image;
            book.category = bookData.category;
            book.tags = bookData.tags;
            book.pdf = bookData.pdf;
            book.author = author;
    
            return from(this.bookRepository.save(book));
          }),
        );
      }
}
