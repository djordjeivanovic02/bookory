export interface ReviewDto {
    id: number;
    user_email: string;
    date: Date;
    rate: number;
    image?: string;
    comment: string;
}