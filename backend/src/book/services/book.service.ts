import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, Like } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dtos/book.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { Author } from 'src/author/entities/author.entity';
import { BookInfo } from '../dtos/book-info.dto';
import { PaginationDto } from 'src/pagination/dtos/paginate.dto.ts';

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
    
    findAll(pagination: PaginationDto): Observable<BookInfo[]> {
      const { page, limit } = pagination;
      const skip = (page - 1) * limit;
      
      return from(this.bookRepository.find({
         relations: ['author'] ,
         skip: skip,
         take: limit
        })).pipe(
        map(books => 
          books.map(book => ({
              id: book.id,
              author: book.author,
              title: book.title,
              description: book.description,
              image: book.image,
              category: book.category,
              tags: book.tags,
              pdf: book.pdf,
          }))
        )
      )
    }

    findOne(id: number): Observable<BookInfo> {
      return from(this.bookRepository.findOne({where: {id: id}, relations: ['author']}));
    }

    getNewestBooks(): Observable<BookInfo[]>{
      return from(this.bookRepository.find({
        order: {created_at: 'DESC'},
        take: 4,
        relations: ['author']
      }))
    }
}
