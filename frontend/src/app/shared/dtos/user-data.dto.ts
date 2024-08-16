import { AuthorDataDto } from "./author-data.dto";
import { DownloadDto } from "./downloaded-book.dto";
import { SavedDto } from "./saved.dto";

export interface UserDataDto {
    id: number;
    email: string;
    created_at: Date | null;
    author: AuthorDataDto | null;
    savedBooks: SavedDto[] | null;
    downloadedBooks: DownloadDto[] | null;
}


export interface UserDataStoreDto {
    id: number;
    email: string;
    created_at: Date | null;
    author: AuthorDataDto | null;
    savedBooks: number[] | null;
    downloadedBooks: number[] | null;
}

export interface UserShortDto {
    id: number;
    email: string;
    created_at: Date | null;
}