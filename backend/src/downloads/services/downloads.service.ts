import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { from, Observable, switchMap } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { PaginationDto } from 'src/pagination/dtos/paginate.dto.ts';
import { DownloadedBook } from '../entities/downloads.entity';
import { CreateDownloadDto } from '../dtos/createDownload.dto';

@Injectable()
export class DownloadsService {
    constructor(
        @InjectRepository(DownloadedBook)
        private downloadedRepository: Repository<DownloadedBook>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ){}

    create(createDownloadedDto: CreateDownloadDto): Observable<DownloadedBook> {
        return from(this.userRepository.findOneBy({id: createDownloadedDto.user_id})).pipe(
            switchMap((user) => {
                if(!user){
                    throw new Error('User not found!');
                }
                return from(this.bookRepository.findOneBy({id: createDownloadedDto.book_id})).pipe(
                    switchMap((book) => {
                        if(!book){
                            throw new Error('Book not found');
                        }
                        const saved = this.downloadedRepository.create({user: user, book: book});
                        return from(this.downloadedRepository.save(saved));
                    }),
                )
            }),
        );
    }

    findUserDownloadedAds(
        pagination: PaginationDto,
        id: number
    ): Observable<DownloadedBook[]>{
        return from(this.downloadedRepository.find({
            where: {user: {id}},
            relations: ['book'],
            skip: pagination.skip,
            take: pagination.limit,
            order: {
                created_at: 'DESC'
            }
        }));
    }
}
