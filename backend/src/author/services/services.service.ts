import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { Repository, UpdateResult, Like } from 'typeorm';
import { CreateAuthorDto } from '../dtos/createAuthor.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { UpdateAuthorDto } from '../dtos/updateAuthor.dto';
import { AuthorDataDto } from '../dtos/authorData.dto';

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

  findAll(): Observable<AuthorDataDto[]> {
    return from(this.authorRepository.find()).pipe(
      map(authors =>
        authors.map(author => ({
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
          picture: author.picture,
          about: author.about,
          website: author.website,
          facebook: author.facebook,
          instagram: author.instagram,
          linkedin: author.linkedin,
        })),
      ),
    );
  }

  findOne(id: number): Observable<Author> {
    return from(this.authorRepository.findOneBy({ id }));
  }

  findByFirstLetter(letter: string): Observable<AuthorDataDto[]>{
    return from(
      this.authorRepository.find({
        where: {
          firstName: Like(`${letter}%`)
        }
      })
    ).pipe(
      map(authors =>
        authors.map(author => ({
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
          picture: author.picture,
          website: author.website,
          facebook: author.facebook,
          instagram: author.instagram,
          linkedin: author.linkedin,
        })),
      ),
    );
  }

  getMostFamous(): Observable<AuthorDataDto[]>{
    //TODO implementirati funkciju
    return null;
  }

  update(id: number, authorData: UpdateAuthorDto): Observable<UpdateResult>{
    return from(this.authorRepository.update(id, authorData));
  }

  remove(id: number): Observable<void> {
    return from(this.authorRepository.delete(id)).pipe(map(() => undefined));
  }
}
