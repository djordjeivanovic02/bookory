export interface CreateBookDto {
    author: number;
    title: string;
    description: string;
    image: File | null;
    category: string;
    tags?: string;
    pdf: File | null;
}
