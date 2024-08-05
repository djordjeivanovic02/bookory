import { Author } from "src/author/entities/author.entity";

export class BookInfo {
    id: number;
    author: Author;
    title: string;
    description: string;
    image: string;
    category: string;
    tags?: string;
    pdf: string;
}
