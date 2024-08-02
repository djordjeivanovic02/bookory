import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorModule } from 'src/author/author.module';
import { Author } from 'src/author/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author]), AuthorModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
