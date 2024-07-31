import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthPayloadDtoRegister } from '../dto/autth-pay-load.dto';
import { Author } from 'src/author/entities/author.entity';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { CreateAuthorDto } from 'src/author/dtos/createAuthor.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Author)
        private authorRepository: Repository<Author>
    ){}

    registerUser({ email, password}: CreateUserDto): Observable<{ token: string }> {
        return from(this.userRepository.findOne({ where: { email: email } })).pipe(
          switchMap(existingUser => {
            if (existingUser) {
              return throwError(() => new ConflictException('Korisnik sa ovim email-om već postoji'));
            }
            return from(bcrypt.hash(password, 10)).pipe(
              switchMap(hashedPassword => {
                const newUser = this.userRepository.create({
                  email,
                  password: hashedPassword,
                });
                return from(this.userRepository.save(newUser)).pipe(
                  map(savedUser => {
                    const { password, ...userWithoutPassword } = savedUser;
                    return { token: this.jwtService.sign(userWithoutPassword) };
                  })
                );
              })
            );
          }),
          catchError(err => throwError(() => err))
        );
    }
    registerAuthor({ email, password, firstName, lastName, website }: CreateAuthorDto): Observable<{ token: string }> {
        return from(this.userRepository.findOne({ where: { email } })).pipe(
          switchMap(existingUser => {
            if (existingUser) {
              return throwError(() => new ConflictException('Korisnik sa ovim email-om već postoji'));
            }
            return from(bcrypt.hash(password, 10)).pipe(
              switchMap(hashedPassword => {
                const user = new User();
                user.email = email;
                user.password = hashedPassword;
    
                const author = new Author();
                author.firstName = firstName;
                author.lastName = lastName;
                author.website = website;
                
                author.user = user;
    
                return from(this.authorRepository.save(author)).pipe(
                  switchMap(savedAuthor => {
                    user.author = savedAuthor;
                    return from(this.userRepository.save(user)).pipe(
                      map(savedUser => {
                        const { password, ...userWithoutPassword } = savedUser;
                        return { token: this.jwtService.sign(userWithoutPassword) };
                      })
                    );
                  })
                );
              })
            );
          }),
          catchError(err => throwError(() => err))
        );
      }

    login({ username, password }: AuthPayloadDto): Observable<{ token: string }> {
        return from(this.userRepository.findOne({ where: { email: username } })).pipe(
          switchMap(user => {
            if (!user) {
              return throwError(() => new NotFoundException('User nije pronadjen'));
            }
            return from(bcrypt.compare(password, user.password)).pipe(
              map(isPasswordValid => {
                if (isPasswordValid) {
                  const { password, ...userWithoutPassword } = user;
                  return { token: this.jwtService.sign(userWithoutPassword) };
                }
                return null;
              })
            );
          }),
          catchError(err => throwError(() => err))
        );
    }

}