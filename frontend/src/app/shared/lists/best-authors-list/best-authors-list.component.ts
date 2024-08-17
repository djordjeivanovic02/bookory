import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BestAuthorsDto } from '../../dtos/best-authors.dto';
import { Store } from '@ngrx/store';
import { selectBestAuthors, selectBestAuthorsLoaded } from '../../store/author/author.selectors';
import { loadBestAuthors } from '../../store/author/author.actions';

@Component({
  selector: 'app-best-authors-list',
  templateUrl: './best-authors-list.component.html',
  styleUrl: './best-authors-list.component.scss'
})
export class BestAuthorsListComponent implements OnInit{
  bestAuthor$: Observable<BestAuthorsDto[] | null>;
  bestAuthorsLoaded$: Observable<boolean>;

  bestAuthors: BestAuthorsDto[] | null = null;

  constructor(private store: Store){
    this.bestAuthor$ = this.store.select(selectBestAuthors);
    this.bestAuthorsLoaded$ = this.store.select(selectBestAuthorsLoaded);
  }

  ngOnInit(): void {
    this.bestAuthorsLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadBestAuthors());
    })

    this.bestAuthor$.subscribe(bestAuthors => {
      this.bestAuthors = bestAuthors;
    });
  }
}
