import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateBookDto } from '../dtos/book.dto';
import { Observable } from 'rxjs';
import { Book } from '../entities/book.entity';
import { BookService } from '../services/book.service';
import { BookInfo } from '../dtos/book-info.dto';
import { PaginationDto } from 'src/pagination/dtos/paginate.dto.ts';
import { AuthorBooksDto } from '../dtos/author-books.dto';
import { FilterDto } from '../dtos/filter.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}

    @Post()
    @Roles('author')
    @UseGuards(RolesGuard)
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 }
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname === 'image') {
            cb(null, './uploads/book-images');
          } else if (file.fieldname === 'pdf') {
            cb(null, './uploads/book-pdfs');
          }
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        }
      })
    }))
    create(@Body() createBookDto: CreateBookDto, @UploadedFiles() files: { image?: Express.Multer.File[], pdf?: Express.Multer.File[] }): Observable<Book> {
      const image = files.image ? files.image[0] : null;
      const pdf = files.pdf ? files.pdf[0] : null;

      createBookDto.image = image.path;
      createBookDto.pdf = pdf.path;

      return this.bookService.create(createBookDto);
    }

    @Get()
    findAll(@Query() pagination: PaginationDto): Observable<BookInfo[]>{
      return this.bookService.findAll(pagination);
    }
    
    @Get('newest')
    // @Roles('author')
    getNewestBooks(): Observable<BookInfo[]> {
      return this.bookService.getNewestBooks();
    }

    @Get('author-books/:id')
    getAuthorBooks(
      @Param('id') id: number,
      @Query() pagination: PaginationDto
    ): Observable<BookInfo[]> {
      return this.bookService.getAuthorBooks(id, pagination);
    }

    @Get('author-books/count/:id')
    getAuthorBooksCount(@Param('id') id: number): Observable<number> {
      return this.bookService.getAuthorBooksCount(id);
    }

    @Get('authors-by-genre')
    findAuthorsByGenre(@Query('genre') genres: string[] | string): Observable<AuthorBooksDto[]> {
      const genreArray = Array.isArray(genres) ? genres : [genres];
      return this.bookService.findAuthorsByGenre(genreArray);
    }

    @Get('categories-by-authors')
    findCategoriesByAuthors(@Query('authors') authors: number[] | number): Observable<string[]> {
      const authorsArray = Array.isArray(authors) ? authors : [authors];
      return this.bookService.findCategoriesByAuthors(authorsArray);
    }

    @Get('filter')
    findBooksByGenre(
      @Query() input: FilterDto,
    ): Observable<{ books: BookInfo[]; count: number }>{
      return this.bookService.filterBook(input);
    }

    @Get('search')
    searchBook(
      @Query('text') text: string
    ): Observable<BookInfo[]>{
      return this.bookService.searchBook(text);
    }

    @Get('categories')
    getCategories(): Observable<string[]> {
      return this.bookService.getCategories();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<BookInfo>{
      return this.bookService.findOne(id);
    }

    @Delete(':id')
    @Roles('author')
    @UseGuards(RolesGuard)
    deleteBook(@Param('id') id: number): Observable<DeleteResult> {
      return this.bookService.deleteBook(id);
    }
}
