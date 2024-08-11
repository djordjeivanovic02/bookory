import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { BookInfoDto } from '../../shared/dtos/book-info.dto';
import { Store } from '@ngrx/store';
import { selectNewestBooks, selectNewestBooksLoaded } from '../../shared/store/book/book.selectors';
import { loadNewestBooks } from '../../shared/store/book/book.actions';
import { BookWithSaved } from '../../shared/dtos/book-with-saved.dto';
import { UserDataStoreDto } from '../../shared/dtos/user-data.dto';
import { selectUserData } from '../../shared/store/user/user.selectors';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent{

}
