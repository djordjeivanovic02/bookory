import { Component, Input } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { BookInfoDto } from '../../dtos/book-info.dto';

@Component({
  selector: 'app-saved-item',
  templateUrl: './saved-item.component.html',
  styleUrl: './saved-item.component.scss'
})
export class SavedItemComponent {
  faDownload = faDownload;

  @Input()
  book: BookInfoDto | null= null;
}
