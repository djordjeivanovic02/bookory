export interface UpdateAuthorDataDto {
    firstName: string;
    lastName: string;
    picture?: File | null;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    about?: string;
}
  