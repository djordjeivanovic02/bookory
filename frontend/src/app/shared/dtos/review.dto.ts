import { UserDataDto, UserShortDto } from "./user-data.dto";

export interface ReviewDto {
    id: number;
    user: UserShortDto;
    created_at: Date;
    rate: number;
    image?: string;
    comment: string;
}