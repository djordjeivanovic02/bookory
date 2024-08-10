import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSavedBooks } from './shared/store/book/book.actions';
import { Observable } from 'rxjs';
import { UserDataDto } from './shared/dtos/user-data.dto';
import { selectUserData } from './shared/store/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'libracorner-frontend';

  userData$: Observable<UserDataDto | undefined | null>;

  constructor(private store: Store){
    this.userData$ = this.store.select(selectUserData);
  }
  
  ngOnInit(): void {
    this.userData$.subscribe(data => {
      if(data){
        this.store.dispatch(loadSavedBooks({id:data.id}));
      }
    })
    
  }
}
