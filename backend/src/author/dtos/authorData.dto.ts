import { Book } from "src/book/entities/book.entity";

export class AuthorDataDto {
    id: number;
    firstName: string;
    lastName: string;
    picture?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;

    books?: Book[];
  }
  