export interface BestAuthorsDto {
    id: number,
    firstName: string,
    lastName: string,
    averageRating: number,
    totalSaves: number;
    image: string | null;
}