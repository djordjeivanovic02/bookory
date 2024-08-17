import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateReviewDto } from '../../dtos/create-review.dto';
import { Observable } from 'rxjs';
import { ReviewDto } from '../../dtos/review.dto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addReview(review: CreateReviewDto): Observable<ReviewDto>{
    return this.http.post<ReviewDto>(`${this.apiUrl}/reviews`, {
      book_id: review.book_id,
      user_id: review.user_id,
      rate: review.rate,
      comment: review.comment
    });
  }
}
