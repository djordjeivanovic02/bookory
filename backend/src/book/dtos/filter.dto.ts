export class FilterDto{
    genre: string[] | string;
    authors: number[] | number;
    skip: number;
    limit: number;
    sort: number;
}