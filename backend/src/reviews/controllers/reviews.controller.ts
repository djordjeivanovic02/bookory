import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/createReview.dto';
import { Observable } from 'rxjs';
import { Review } from '../entities/reviews.entity';
import { ReviewDataDto } from '../dtos/reviewData.dto';
import { DeleteResult } from 'typeorm';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewService: ReviewsService){}

    @Post()
    create(@Body() createReviewDto: CreateReviewDto): Observable<Review> {
        return this.reviewService.create(createReviewDto);
    }

    @Get('book-review/:id')
    findUserSavedAds(
        @Param('id') id: number,
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Observable<ReviewDataDto[]> {
        return this.reviewService.findBookReviews({page, limit}, id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Observable<DeleteResult> {
        return this.reviewService.remove(id);
    }
}
