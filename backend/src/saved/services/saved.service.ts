import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavedBook } from '../entities/saved.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateSavedDto } from '../dtos/createSaved.dto';
import { forkJoin, from, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { PaginationDto } from 'src/pagination/dtos/paginate.dto.ts';

@Injectable()
export class SavedService {
    constructor(
        @InjectRepository(SavedBook)
        private savedRepository: Repository<SavedBook>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ){}

    create(createSavedDto: CreateSavedDto): Observable<SavedBook> {
        return from(this.userRepository.findOneBy({id: createSavedDto.user_id})).pipe(
            switchMap((user) => {
                if(!user){
                    throw new Error('User not found!');
                }
                return from(this.bookRepository.findOneBy({id: createSavedDto.book_id})).pipe(
                    switchMap((book) => {
                        if(!book){
                            throw new Error('Book not found');
                        }
                        const saved = this.savedRepository.create({user: user, book: book});
                        return from(this.savedRepository.save(saved));
                    }),
                )
            }),
        );
    }

    status(data: CreateSavedDto): Observable<SavedBook> {
        return from(this.savedRepository.findOne({
            where: {
                user: {id: data.user_id},
                book: {id: data.book_id}     
            }
        }));
    }

    getUserSaves(id:number): Observable<number[]>{
        return from(this.savedRepository.find({
            where: {user: {id}},
            relations: ['book']
        })).pipe(
            map(saves => saves.map(save => save.book.id))
        )
    }

    findUserSavedAds(
        pagination: PaginationDto,
        id: number
    ): Observable<SavedBook[]>{
        const {page, limit} = pagination;
        const skip = (page-1) * limit;

        return from(this.savedRepository.find({
            where: {user: {id}},
            relations: ['book'],
            skip: skip,
            take: limit
        }));
    }

    removeWithUserAndBook(user_id: number, book_id: number): Observable<DeleteResult | null> {
        return from(this.savedRepository.findOne({
            where: {
                user: { id: user_id },
                book: { id: book_id }
            }
        })).pipe(
            mergeMap(savedBook => {
                if (savedBook) {
                    return this.remove(savedBook.id);
                } else {
                    return of(null);
                }
            })
        );
    }
    
    remove(id: number): Observable<DeleteResult> {
        return from(this.savedRepository.delete(id));
    }
    
}
