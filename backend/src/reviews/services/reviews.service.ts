import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { PaginationDto } from 'src/pagination/dtos/paginate.dto.ts';
import { Review } from '../entities/reviews.entity';
import { CreateReviewDto } from '../dtos/createReview.dto';
import { ReviewDataDto } from '../dtos/reviewData.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ){}

    create(createReviewDto: CreateReviewDto): Observable<Review> {
        return from(this.userRepository.findOneBy({id: createReviewDto.user_id})).pipe(
            switchMap((user) => {
                if(!user){
                    throw new Error('User not found!');
                }
                return from(this.bookRepository.findOneBy({id: createReviewDto.book_id})).pipe(
                    switchMap((book) => {
                        if(!book){
                            throw new Error('Book not found');
                        }
                        const review = this.reviewRepository.create({user: user, book: book, rate: createReviewDto.rate, comment: createReviewDto.comment});
                        return from(this.reviewRepository.save(review));
                    }),
                )
            }),
        );
    }

    findBookReviews(
        pagination: PaginationDto,
        id: number
    ): Observable<ReviewDataDto[]>{

        return from(this.reviewRepository.find({
            where: {book: {id}},
            relations: ['user'],
            skip: pagination.skip,
            take: pagination.limit
        })).pipe(
            map(reviews => 
                reviews.map(review => ({
                    email: review.user.email,
                    date: review.created_at,
                    rate: review.rate,
                    comment: review.comment
                }))
            )
        );
    }

    remove(id: number): Observable<DeleteResult> {
        return from(this.reviewRepository.delete(id));
    }
}
