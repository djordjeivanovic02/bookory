import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { AuthorService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), UserModule],
  controllers: [ControllersController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule { }
