import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { Repository, UpdateResult, Like } from 'typeorm';
import { CreateAuthorDto } from '../dtos/createAuthor.dto';
import { from, map, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { UpdateAuthorDto } from '../dtos/updateAuthor.dto';
import { AuthorDataDto } from '../dtos/authorData.dto';
import { Book } from 'src/book/entities/book.entity';
import { Review } from 'src/reviews/entities/reviews.entity';
import { SavedBook } from 'src/saved/entities/saved.entity';
import { AuthorStatDto } from '../dtos/authorStat.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(SavedBook)
    private readonly savedBookRepository: Repository<SavedBook>,
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
    return from(this.authorRepository.find(
      {relations: ['books']}
    )).pipe(
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
          books: author.books
        })),
      ),
    );
  }

  findOne(id: number): Observable<Author> {
    return from(this.authorRepository.findOne(
      {
        where: {id: id},
        relations: ['books']
      }
    ));
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

  getMostFamous(): Observable<AuthorStatDto[]> {
    return from(this.authorRepository.find({ relations: ['books'] })).pipe(
      mergeMap(authors => from(authors)),
      mergeMap(author =>
        from(Promise.all(author.books.map(async book => {
          const reviews = await this.reviewRepository.find({ where: { book: { id: book.id } } });
          const saves = await this.savedBookRepository.count({ where: { book: { id: book.id } } });
          const averageRating = reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length
            : 0;
          return { averageRating, saves };
        }))).pipe(
          map(bookStats => {
            const totalAverageRating = bookStats.reduce((sum, stats) => sum + stats.averageRating, 0) / bookStats.length;
            const totalSaves = bookStats.reduce((sum, stats) => sum + stats.saves, 0);
            return { author, totalAverageRating, totalSaves };
          })
        )
      ),
      toArray(),
      map(authorStats =>
        authorStats
          .map(({ author, totalAverageRating, totalSaves }) => ({
            id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
            averageRating: totalAverageRating,
            image: author.picture,
            totalSaves,
          }))
          .sort((a, b) => b.averageRating - a.averageRating || b.totalSaves - a.totalSaves)
      ),
      map(authorStats => authorStats.slice(0, 6))
    );
  }

  update(id: number, authorData: UpdateAuthorDto): Observable<UpdateResult>{
    return from(this.authorRepository.update(id, authorData));
  }

  remove(id: number): Observable<void> {
    return from(this.authorRepository.delete(id)).pipe(map(() => undefined));
  }
}
