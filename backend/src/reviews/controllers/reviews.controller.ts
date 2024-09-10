import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/createReview.dto';
import { Observable } from 'rxjs';
import { Review } from '../entities/reviews.entity';
import { ReviewDataDto } from '../dtos/reviewData.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewService: ReviewsService){}

    @Post()
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    create(@Body() createReviewDto: CreateReviewDto): Observable<Review> {
        return this.reviewService.create(createReviewDto);
    }

    @Get('book-review/:id')
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    findUserSavedAds(
        @Param('id') id: number,
        @Query('page') skip: number,
        @Query('limit') limit: number
    ): Observable<ReviewDataDto[]> {
        return this.reviewService.findBookReviews({skip, limit}, id);
    }

    @Delete(':id')
    @Roles('author', 'user')
    @UseGuards(RolesGuard)
    remove(@Param('id') id: number): Observable<DeleteResult> {
        return this.reviewService.remove(id);
    }
}
