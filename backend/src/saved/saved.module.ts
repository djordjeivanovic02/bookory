import { Module } from '@nestjs/common';
import { SavedService } from './services/saved.service';
import { SavedController } from './controller/saved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedBook } from './entities/saved.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavedBook, User, Book])],
  providers: [SavedService],
  controllers: [SavedController],
  exports: [SavedService]
})
export class SavedModule {}
