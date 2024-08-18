import { BookInfoDto } from "./book-info.dto";

export interface AuthorDataDto {
    id: number;
    firstName: string;
    lastName: string;
    picture?: string | null;
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    books?: BookInfoDto[];
    booksCount?: number;
    about?: string;
  }
  