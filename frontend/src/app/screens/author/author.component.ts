import { Component, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthorDataDto } from "../../shared/dtos/author-data.dto";
import { selectAuthorById } from "../../shared/store/author/author.selectors";
import { loadAuthorBooks, loadAuthorById } from "../../shared/store/author/author.actions";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrl: "./author.component.scss",
})
export class AuthorComponent implements OnInit {
  navLinks: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faLinkedin = faLinkedinIn;

  authorId: number | null = null;

  authorData$: Observable<AuthorDataDto | null>;
  authorData: AuthorDataDto | null  = null;

  skip: number = 0;
  limit: number = 2;

  showLoadMore(): boolean {
    if(this.authorData && this.authorData.books && this.authorData.booksCount)
      return this.authorData.books?.length < this.authorData.booksCount;
    return false;
  }

  loadMore(){
    if(this.authorId)
      this.store.dispatch(loadAuthorBooks({author_id: this.authorId, skip: this.skip, limit: this.limit}));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.authorId = id ? +id : null;
  
      if (this.authorId) {
        this.authorData$ = this.store.select(selectAuthorById(this.authorId));
        this.store.dispatch(loadAuthorById({ id: this.authorId }));
      }
    });

    this.authorData$.subscribe(authorData => {
      this.authorData = authorData;
      if(this.authorData && this.authorData.books) this.skip = this.authorData.books.length;
      if(this.authorData && this.authorData.books && this.authorData.books.length === 0 && this.authorData.booksCount !== 0)
        this.store.dispatch(loadAuthorBooks({author_id: this.authorData?.id!, skip: this.skip, limit: this.limit}));
    });
  }
  

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ){
    this.authorData$ = this.authorData$ = new Observable<AuthorDataDto | null>();
  }
}
