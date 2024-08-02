export class CreateBookDto {
    id: number;
    author: number;
    title: string;
    description: string;
    image: string;
    category: string;
    tags?: string;
    pdf: string;
}
