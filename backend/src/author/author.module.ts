import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { AuthorService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { Review } from 'src/reviews/entities/reviews.entity';
import { SavedBook } from 'src/saved/entities/saved.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author, User, Book, Review, SavedBook]), UserModule, AuthModule],
  controllers: [ControllersController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule { }
