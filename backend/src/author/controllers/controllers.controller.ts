import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from '../services/services.service';
import { CreateAuthorDto } from '../dtos/createAuthor.dto';
import { Observable } from 'rxjs';
import { Author } from '../entities/author.entity';

@Controller('author')
export class ControllersController {
  constructor(private readonly authorService: AuthorService) { }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Observable<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll(): Observable<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Author> {
    return this.authorService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<void> {
    return this.authorService.remove(id);
  }
}
