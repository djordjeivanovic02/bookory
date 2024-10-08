import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, ILike, In } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from '../dtos/book.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { Author } from 'src/author/entities/author.entity';
import { BookInfo } from '../dtos/book-info.dto';
import { PaginationDto } from 'src/pagination/dtos/paginate.dto.ts';
import { AuthorBooksDto } from '../dtos/author-books.dto';
import { FilterDto } from '../dtos/filter.dto';
import { DeleteResult } from 'typeorm';

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
      return from(this.bookRepository.find({
         relations: ['author'] ,
         skip: pagination.skip,
         take: pagination.limit
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
      return from(this.bookRepository.findOne({where: {id: id}, relations: ['author', 'reviews']}));
    }

    getNewestBooks(): Observable<BookInfo[]>{
      return from(this.bookRepository.find({
        order: {created_at: 'DESC'},
        take: 4,
        relations: ['author', 'reviews']
      }))
    }

    getAuthorBooks(
      id: number,
      pagination: PaginationDto
    ): Observable<BookInfo[]> {
      return from(this.bookRepository.find({
        where: {author: {id}},
        skip: pagination.skip,
        take: pagination.limit,
        relations: ['reviews'],
        order: {created_at: 'desc'}
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
             reviews: book.reviews
         }))
       )
     )
    }

    getAuthorBooksCount(id:number): Observable<number> {
      return from(this.bookRepository.count({where: {author: {id}}}));
    }

    findAuthorsByGenre(genres: string[]): Observable<AuthorBooksDto[]> {
      return from(
        this.bookRepository.find({
          where: { category: In(genres) },
          relations: ['author'],
        })
      ).pipe(
        map(books => {
          const authorBookCount = new Map<number, { author: Author, count: number }>();
    
          books.forEach(book => {
            if (book.author) {
              const authorData = authorBookCount.get(book.author.id);
              if (authorData) {
                authorData.count += 1;
              } else {
                authorBookCount.set(book.author.id, { author: book.author, count: 1 });
              }
            }
          });
    
          return Array.from(authorBookCount.values()).map(({ author, count }) => ({
            author,
            booksCount: count,
          }));
        })
      );
    }
    

    filterBook(input: FilterDto): Observable<{ books: BookInfo[]; count: number }> {
      const { skip, limit, sort } = input;
    
      const genreCondition = Array.isArray(input.genre) ? { category: In(input.genre) } : { category: input.genre };
      const authorsCondition = Array.isArray(input.authors) ? { author: { id: In(input.authors) } } : { author: { id: input.authors } };
    
      let orderBy: { [key: string]: 'ASC' | 'DESC' } = {};
    
      if (sort == 1) orderBy = { created_at: 'DESC' };
      else orderBy = { title: 'DESC' };
    
      return from(
        this.bookRepository.findAndCount({
          where: { ...genreCondition, ...authorsCondition },
          relations: ['author', 'reviews'],
          skip: skip,
          take: limit,
          order: orderBy,
        })
      ).pipe(
        map(([books, count]) => ({
          books,
          count
        }))
      );
    }
    

    findCategoriesByAuthors(authors: number[]): Observable<string[]> {
      const authorsCondition = Array.isArray(authors) ? { author: {id: In(authors)} } : { author: { id: authors } };
      return from(this.bookRepository.find({
        where: authorsCondition,
        relations: ['author'],
      })).pipe(
        map(books => {
          const categories = new Set<string>();
          books.forEach(book => {
            categories.add(book.category);
          });
          return Array.from(categories);
        }),
      );
    }

    searchBook(text: string): Observable<BookInfo[]> {
      return from(this.bookRepository.find({
        relations: ['reviews'],
        where: { title: ILike(`${text}%`)}
      }));
    }

    getCategories(): Observable<string[]>{
      return from(this.bookRepository.find()).pipe(
        map(books => {
          const categories = new Set<string>();
          books.forEach(book => {
            categories.add(book.category);
          })
          return Array.from(categories);
        })
      )
    }

    deleteBook(id: number): Observable<DeleteResult>{
      return from(this.bookRepository.delete({id}));
    }
}
