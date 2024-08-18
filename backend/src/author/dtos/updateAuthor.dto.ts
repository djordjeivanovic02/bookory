export class UpdateAuthorDto {
  firstName: string;
  lastName: string;
  picture?: string;
  website?: string;
  about: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}
 
export class UpdateAuthorWithoutPictureDto {
  firstName: string;
  lastName: string;
  website?: string;
  facebook?: string;
  about: string;
  instagram?: string;
  linkedin?: string;
}
 
