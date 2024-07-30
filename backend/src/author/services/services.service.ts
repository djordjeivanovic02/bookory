import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from '../dtos/createAuthor.dto';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) { }

  create(createAuthorDto: CreateAuthorDto): Observable<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return from(this.authorRepository.save(author));
  }

  findAll(): Observable<Author[]> {
    return from(this.authorRepository.find());
  }

  findOne(id: number): Observable<Author> {
    return from(this.authorRepository.findOneBy({ id }));
  }

  remove(id: number): Observable<void> {
    return from(this.authorRepository.delete(id)).pipe(map(() => undefined));
  }
}
