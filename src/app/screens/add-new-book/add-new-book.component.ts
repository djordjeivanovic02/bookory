import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-new-book",
  templateUrl: "./add-new-book.component.html",
  styleUrl: "./add-new-book.component.scss",
})
export class AddNewBookComponent {
  bookForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  pdfFileName: string | null = null;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      image: [null, Validators.required],
      pdf: [null, Validators.required],
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

  onPdfPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.bookForm.patchValue({ pdf: file });
    this.bookForm.get("pdf")!.updateValueAndValidity();
    this.pdfFileName = file.name;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      // Submit form data to the server
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer!.files[0];
    this.bookForm.patchValue({ image: file });
    this.bookForm.get("image")!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
