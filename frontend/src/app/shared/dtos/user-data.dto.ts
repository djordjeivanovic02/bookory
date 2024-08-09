import { AuthorDataDto } from "./author-data.dto";

export interface UserDataDto {
    id: number;
    email: string;
    created_at: Date | null;
    author: AuthorDataDto | null;
}