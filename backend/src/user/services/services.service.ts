import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { from, map, Observable } from 'rxjs';
import { Author } from 'src/author/entities/author.entity';
import { CreateAuthorDto } from 'src/author/dtos/createAuthor.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Observable<User> {
    const user = this.userRepository.create(createUserDto);
    return from(this.userRepository.save(user));
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOneBy({ id }));
  }


  remove(id: number): Observable<void> {
    return from(this.userRepository.delete(id)).pipe(map(() => undefined));
  }
}
