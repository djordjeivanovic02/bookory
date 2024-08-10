import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { User } from './user/entities/user.entity';
import { Author } from './author/entities/author.entity';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';
import { SavedModule } from './saved/saved.module';
import { SavedBook } from './saved/entities/saved.entity';
import { DownloadsModule } from './downloads/downloads.module';
import { ReviewsModule } from './reviews/reviews.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [User, Author],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Author, Book, User, SavedBook]),
    UserModule,
    AuthorModule,
    AuthModule,
    BookModule,
    SavedModule,
    DownloadsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
