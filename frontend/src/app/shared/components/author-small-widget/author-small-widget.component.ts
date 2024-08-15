import { Component, Input } from '@angular/core';
import { AuthorDataDto } from '../../dtos/author-data.dto';

@Component({
  selector: 'app-author-small-widget',
  templateUrl: './author-small-widget.component.html',
  styleUrl: './author-small-widget.component.scss'
})
export class AuthorSmallWidgetComponent {
  @Input()
  author: AuthorDataDto | null = null;
  
  @Input()
  notFound: boolean = false;
  
}
