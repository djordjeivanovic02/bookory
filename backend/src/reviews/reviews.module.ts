import { Module } from '@nestjs/common';
import { ReviewsService } from './services/reviews.service';
import { ReviewsController } from './controllers/reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/reviews.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Book])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService]
})
export class ReviewsModule {}
