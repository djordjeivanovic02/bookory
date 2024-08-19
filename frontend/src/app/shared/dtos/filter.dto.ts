import { AuthorDataDto } from "./author-data.dto";

export interface FilterDto{
    categories: string[];
    authors: AuthorDataDto[];
    skip: number;
    limit: number;
    sort: number;
}