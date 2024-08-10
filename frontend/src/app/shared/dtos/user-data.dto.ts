import { AuthorDataDto } from "./author-data.dto";
import { SavedDto } from "./saved.dto";

export interface UserDataDto {
    id: number;
    email: string;
    created_at: Date | null;
    author: AuthorDataDto | null;
    savedBooks: SavedDto[] | null;
}