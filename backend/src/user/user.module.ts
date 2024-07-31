import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { UserService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ControllersController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule { }
