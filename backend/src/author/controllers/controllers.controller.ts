import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthorService } from '../services/services.service';
import { CreateAuthorDto } from '../dtos/createAuthor.dto';
import { Observable } from 'rxjs';
import { Author } from '../entities/author.entity';
import { User } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateResult } from 'typeorm';
import { UpdateAuthorDto } from '../dtos/updateAuthor.dto';
import { AuthorDataDto } from '../dtos/authorData.dto';
import { AuthorStatDto } from '../dtos/authorStat.dto';

@Controller('author')
export class ControllersController {
  constructor(private readonly authorService: AuthorService) { }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Observable<User> {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll(): Observable<AuthorDataDto[]> {
    return this.authorService.findAll();
  }

  @Get('findById/:id')
  findOne(@Param('id') id: number): Observable<Author> {
    return this.authorService.findOne(id);
  }
  
  @Get('by-first-letter')
  findByFirstLetter(@Query('letter') letter: string): Observable<AuthorDataDto[]> {
    return this.authorService.findByFirstLetter(letter);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('picture', {
    dest: './uploads',
  }))
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() authorData: UpdateAuthorDto
  ): Observable<UpdateResult>{
    const { picture, ...authorDataWithoutPicture } = authorData;
    const picturePath = file ? file.path : null;

    const updatedAuthorData: UpdateAuthorDto = {
      ...authorDataWithoutPicture,
      picture: picturePath
    };

    return this.authorService.update(id, updatedAuthorData);  
  }

  @Get('most-famous')
  getMostFamous():Observable<AuthorStatDto[]> {
    return this.authorService.getMostFamous();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<void> {
    return this.authorService.remove(id);
  }
}
