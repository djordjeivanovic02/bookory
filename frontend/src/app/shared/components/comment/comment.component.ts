import { Component, Input } from '@angular/core';
import { ReviewDto } from '../../dtos/review.dto';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input()
  review: ReviewDto | null = null;
  @Input()
  isMine: boolean = false;

  formatDate(): string{
    const formattedDate = new Date(this.review?.created_at!).toLocaleDateString('sr-Latn-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).replace(/\.$/, '');

    return formattedDate;
  }
}
