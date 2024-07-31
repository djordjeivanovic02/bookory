import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from '../dtos/createAuthor.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

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
    // author.user = user;

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

  remove(id: number): Observable<void> {
    return from(this.authorRepository.delete(id)).pipe(map(() => undefined));
  }
}
