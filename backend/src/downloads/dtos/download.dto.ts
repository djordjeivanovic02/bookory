import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";

export class DownloadDto {
    id: number;
    user: User;
    book: Book;
}