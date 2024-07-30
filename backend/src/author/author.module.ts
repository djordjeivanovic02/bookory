import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { AuthorService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [ControllersController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule { }
