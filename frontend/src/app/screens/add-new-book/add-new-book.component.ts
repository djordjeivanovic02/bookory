import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserDataStoreDto } from "../../shared/dtos/user-data.dto";
import { CreateBookDto } from "../../shared/dtos/create-book.dto";
import { Store } from "@ngrx/store";
import { addNewBook } from "../../shared/store/book/book.actions";
import { Observable, Subscription } from "rxjs";
import { selectNewBookAdded } from "../../shared/store/book/book.selectors";

@Component({
  selector: "app-add-new-book",
  templateUrl: "./add-new-book.component.html",
  styleUrl: "./add-new-book.component.scss",
})
export class AddNewBookComponent implements OnInit, OnDestroy{
  @Input()
  userData: UserDataStoreDto | null = null;

  pictureFile: File | null = null;
  pdfFile: File | null = null;

  newBookData?: CreateBookDto;

  showNotification$: Observable<boolean | null>;
  private showNotificationSubscription: Subscription = new Subscription();
  showNotification: boolean = false;

  changePicture(value: File) { this.newBookData!.image = value; }
  changeTitle(value: string) { this.newBookData!.title = value; }
  changeDescription(value: string) { this.newBookData!.description = value; }
  changeTags(value: string) { this.newBookData!.tags = value; }
  changeCategory(value: string) { this.newBookData!.category = value; }
  changePdf(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.pdfFile = input.files[0];
      if (this.newBookData) {
        this.newBookData.pdf = this.pdfFile;
      }
    }
  }

  saveBook() {
    if(this.newBookData && this.userData && this.userData.author){
      const formData = new FormData();
      formData.append('title', this.newBookData.title);
      formData.append('author', this.userData.author.id.toString())
      formData.append('description', this.newBookData.description);
      formData.append('tags', this.newBookData.tags ? this.newBookData.tags : '');
      formData.append('category', this.newBookData.category);
      formData.append('image', this.newBookData.image!);
      formData.append('pdf', this.newBookData.pdf!);

      this.store.dispatch(addNewBook({bookData: formData}));
    }
  }

  ngOnInit(): void {
    this.showNotificationSubscription = this.showNotification$.subscribe(element => {
      if(element)
        this.showNotification = element!
    });
  }

  ngOnDestroy(): void {
    this.showNotificationSubscription.unsubscribe();
  }

  constructor(private store: Store){
    this.newBookData = {
      author: -1,
      title: '',
      description: '',
      image: null,
      category: '',
      tags: '',
      pdf: null
    }

    this.showNotification$ = this.store.select(selectNewBookAdded);

  }
}
