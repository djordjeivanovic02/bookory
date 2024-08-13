import { BookInfoDto } from "./book-info.dto";
import { UserDataDto } from "./user-data.dto";

export interface DownloadDto {
    id: number;
    user: UserDataDto;
    book: BookInfoDto;
    created_at: Date;

    formattedDate?: string;
}