import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../shared/store/user/user.selectors';
import { UserDataStoreDto } from '../../shared/dtos/user-data.dto';
import { UpdateAuthorDataDto } from '../../shared/dtos/update-author-data.dto';
import { changeAuthorData } from '../../shared/store/author/author.actions';

@Component({
  selector: 'app-author-profile-data',
  templateUrl: './author-profile-data.component.html',
  styleUrls: ['./author-profile-data.component.scss']
})
export class AuthorProfileDataComponent implements OnInit, OnDestroy{
  
  @Input()
  userData: UserDataStoreDto | null = null;

  firstName: string = '';
  lastName: string = '';
  about: string = '';
  facebook: string = '';
  instagram: string = '';
  linkedin: string = '';
  picture: string = '';

  pictureFile: File | null = null;

  newAuthorData?: UpdateAuthorDataDto;

  showNotification: boolean = false;

  changeName(value: string) { this.newAuthorData!.firstName = value; this.enableButton()}
  changeSurname(value: string) { this.newAuthorData!.lastName = value;  this.enableButton()}
  changeAbout(value: string) { this.newAuthorData!.about = value;  this.enableButton()}
  changeFacebook(value: string) { this.newAuthorData!.facebook = value;  this.enableButton()}
  changeInstagram(value: string) { this.newAuthorData!.instagram = value;  this.enableButton()}
  changeLinkedin(value: string) { this.newAuthorData!.linkedin = value;  this.enableButton()}
  changePicture(value: File) { this.newAuthorData!.picture = value; }
  
  enableButton(): boolean {
    if(this.newAuthorData &&
      this.newAuthorData.firstName !== '' &&
      this.newAuthorData.lastName !== '' &&
      this.newAuthorData.about !== '' &&
      this.newAuthorData.firstName !== ''
    ) return true;
    return false;
  }
  
  onSaveChanges(): void {
    if (this.newAuthorData && this.userData) {
      const formData = new FormData();
      formData.append('firstName', this.newAuthorData.firstName);
      formData.append('lastName', this.newAuthorData.lastName);
      formData.append('about', this.newAuthorData.about || '');
      formData.append('facebook', this.newAuthorData.facebook || '');
      formData.append('instagram', this.newAuthorData.instagram || '');
      formData.append('linkedin', this.newAuthorData.linkedin || '');
      
      if (this.newAuthorData.picture) {
        formData.append('picture', this.newAuthorData.picture);
      }
  
      this.store.dispatch(changeAuthorData({
        user_id: this.userData.id!,
        author_id: this.userData.author?.id!,
        authorData: formData
      }));
    }
  }
  
  
  ngOnInit(): void {
    if (this.userData) {
      this.userData = this.userData;
      this.newAuthorData = {
        firstName: this.userData.author?.firstName || '',
        lastName: this.userData.author?.lastName || '',
        about: this.userData.author?.about || '',
        facebook: this.userData.author?.facebook || '',
        instagram: this.userData.author?.instagram || '',
        linkedin: this.userData.author?.linkedin || '',
        picture: null,
      }
      this.picture = this.userData.author?.picture!;
    }
  }

  ngOnDestroy(): void {
  }

  constructor(private store: Store){
  }
}
