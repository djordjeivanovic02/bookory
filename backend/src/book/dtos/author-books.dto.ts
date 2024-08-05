import { Author } from "src/author/entities/author.entity";

export class AuthorBooksDto {
    author: Author;
    booksCount: number;
  }