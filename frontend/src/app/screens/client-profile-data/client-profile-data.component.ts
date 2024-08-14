import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataStoreDto } from '../../shared/dtos/user-data.dto';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectUserData } from '../../shared/store/user/user.selectors';

@Component({
  selector: 'app-client-profile-data',
  templateUrl: './client-profile-data.component.html',
  styleUrl: './client-profile-data.component.scss'
})
export class ClientProfileDataComponent implements OnInit {
  userData$: Observable<UserDataStoreDto | null>;
  userData: UserDataStoreDto | null = null;

  constructor(private store: Store, private route: ActivatedRoute){
    this.userData$ = this.store.select(selectUserData);
  }

  ngOnInit(): void {
    this.userData$.subscribe(userData => this.userData = userData);
  }
}
