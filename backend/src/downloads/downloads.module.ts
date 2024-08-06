import { Module } from '@nestjs/common';
import { DownloadsService } from './services/downloads.service';
import { DownloadsController } from './controllers/downloads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadedBook } from './entities/downloads.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DownloadedBook, User, Book])],
  providers: [DownloadsService],
  controllers: [DownloadsController],
  exports: [DownloadsService]
})
export class DownloadsModule {}
