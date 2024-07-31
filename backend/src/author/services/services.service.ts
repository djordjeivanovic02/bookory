import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateAuthorDto } from '../dtos/createAuthor.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { UpdateAuthorDto } from '../dtos/updateAuthor.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  create(authorData: CreateAuthorDto): Observable<User> {
    const user = new User();
    user.email = authorData.email;
    user.password = authorData.password;

    const author = new Author();
    author.firstName = authorData.firstName;
    author.lastName = authorData.lastName;
    author.website = authorData.website;

    user.author = author;

    return from(this.authorRepository.save(author)).pipe(
      switchMap(savedAuthor => {
        user.author = savedAuthor;
        return from(this.userRepository.save(user));
      })
    );
  }

  findAll(): Observable<Author[]> {
    return from(this.authorRepository.find());
  }

  findOne(id: number): Observable<Author> {
    return from(this.authorRepository.findOneBy({ id }));
  }

  update(id: number, authorData: UpdateAuthorDto): Observable<UpdateResult>{
    return from(this.authorRepository.update(id, authorData));
  }

  remove(id: number): Observable<void> {
    return from(this.authorRepository.delete(id)).pipe(map(() => undefined));
  }
}
