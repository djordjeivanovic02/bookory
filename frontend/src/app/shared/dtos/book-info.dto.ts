import { AuthorDataDto } from "./author-data.dto";

export interface BookInfoDto {
    id: number;
    author: AuthorDataDto;
    title: string;
    description: string;
    image: string;
    category: string;
    tags?: string;
    pdf: string;
}
