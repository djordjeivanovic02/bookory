import { AuthorDataDto } from "./author-data.dto";

export interface BookWithSaved{
    isSaved: boolean | undefined; 
    id: number; 
    author: AuthorDataDto; 
    title: string; 
    description: string; 
    image: string; 
    category: string; 
    tags?: string | undefined; 
    pdf: string;
}