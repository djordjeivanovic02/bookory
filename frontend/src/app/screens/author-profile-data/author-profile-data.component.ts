import { Component, OnDestroy, OnInit } from '@angular/core';
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

  userData$: Observable<UserDataStoreDto | null>;
  userData: UserDataStoreDto | null = null;
  private userDataSubscription: Subscription = new Subscription();

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
    this.userDataSubscription = this.userData$.subscribe(userData => {
      if (userData) {
        this.userData = userData;
        this.newAuthorData = {
          firstName: userData.author?.firstName || '',
          lastName: userData.author?.lastName || '',
          about: userData.author?.about || '',
          facebook: userData.author?.facebook || '',
          instagram: userData.author?.instagram || '',
          linkedin: userData.author?.linkedin || '',
          picture: null,
        }
        this.picture = userData.author?.picture!;
      }
    });
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  constructor(private store: Store){
    this.userData$ = this.store.select(selectUserData);
  }
}
