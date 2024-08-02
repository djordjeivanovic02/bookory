import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateBookDto } from '../dtos/book.dto';
import { Observable } from 'rxjs';
import { Book } from '../entities/book.entity';
import { BookService } from '../services/book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}

    @Post()
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

}
