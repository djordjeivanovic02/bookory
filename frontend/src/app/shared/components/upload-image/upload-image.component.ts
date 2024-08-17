import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"],
})
export class UploadImageComponent implements OnChanges {
  faUpload = faCloudUpload;

  @Input()
  text: string = "Dodaj naslovnu sliku knjige";

  @Input()
  currentImageUrl: string = '';

  @Output() 
  imageSelected = new EventEmitter<File>();

  bookForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      image: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentImageUrl'] && this.currentImageUrl) {
      console.log('Current Image URL:', this.currentImageUrl);
      try {
        this.imagePreview = this.currentImageUrl;
      } catch (error) {
        console.error('Invalid URL:', error);
        this.imagePreview = null;
      }
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.bookForm.patchValue({ image: file });
      this.bookForm.get("image")!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Emitovanje izabranog fajla
      this.imageSelected.emit(file);
    }
  }
}
