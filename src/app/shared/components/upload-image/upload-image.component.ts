import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faCloudUpload, faUpload } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrl: "./upload-image.component.scss",
})
export class UploadImageComponent {
  faUpload = faCloudUpload;

  @Input()
  text: string = "Dodaj naslovnu sliku knjige";

  bookForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      image: [null, Validators.required],
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.bookForm.patchValue({ image: file });
    this.bookForm.get("image")!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
