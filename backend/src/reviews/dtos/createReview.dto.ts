export class CreateReviewDto {
    user_id: number;
    book_id: number;
    rate: number;
    comment: string;
}