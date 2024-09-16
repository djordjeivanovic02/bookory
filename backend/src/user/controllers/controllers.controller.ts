import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/services.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class ControllersController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @Roles('author', 'user')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: number): Observable<void> {
    return this.userService.remove(id);
  }
}
