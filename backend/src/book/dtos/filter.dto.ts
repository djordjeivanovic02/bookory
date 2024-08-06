export class FilterDto{
    genre: string[] | string;
    authors: number[] | number;
    page: number;
    limit: number;
    sort: number;
}