import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../shared/store/user/user.selectors';
import { UserDataStoreDto } from '../../shared/dtos/user-data.dto';

@Component({
  selector: 'app-author-profile-data',
  templateUrl: './author-profile-data.component.html',
  styleUrls: ['./author-profile-data.component.scss']
})
export class AuthorProfileDataComponent implements OnInit {

  userData$: Observable<UserDataStoreDto | null>;
  userData: UserDataStoreDto | null = null;

  firstName: string = '';
  lastName: string = '';
  about: string = '';
  facebook: string = '';
  instagram: string = '';
  linkedin: string = '';
  picture: string = '';

  pictureFile: File | null = null;

  ngOnInit(): void {
    this.userData$.subscribe(userData => {
      if (userData) {
        this.userData = userData;
        this.firstName = userData.author?.firstName || '';
        this.lastName = userData.author?.lastName || '';
        this.about = userData.author?.about || '';
        this.facebook = userData.author?.facebook || '';
        this.instagram = userData.author?.instagram || '';
        this.linkedin = userData.author?.linkedin || '';
        this.picture = userData.author?.picture || '';
      }
    });
  }
  changeName(value: string) { this.firstName = value; }
  changeSurname(value: string) { this.lastName = value; }
  changeAbout(value: string) { this.about = value; }
  changeFacebook(value: string) { this.facebook = value; }
  changeInstagram(value: string) { this.instagram = value; }
  changeLinkedin(value: string) { this.linkedin = value; }

  onSaveChanges(): void {
    if (this.userData) {
      const updatedUserData: UserDataStoreDto = {
        ...this.userData,
        author: this.userData.author ? {
          ...this.userData.author,
          firstName: this.firstName,
          lastName: this.lastName,
          about: this.about,
          facebook: this.facebook,
          instagram: this.instagram,
          linkedin: this.linkedin,
          picture: this.picture
        }: null
      };

      console.log(updatedUserData);

      // Pozovi akciju za čuvanje ažuriranih podataka
      // this.store.dispatch(saveUserData({ userData: updatedUserData }));
    }
  }

  constructor(private store: Store){
    this.userData$ = this.store.select(selectUserData);
  }
}
