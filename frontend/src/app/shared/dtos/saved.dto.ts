import { BookInfoDto } from "./book-info.dto";

export interface SavedDto {
    id: number;
    book: BookInfoDto;
    created_at: Date;
}