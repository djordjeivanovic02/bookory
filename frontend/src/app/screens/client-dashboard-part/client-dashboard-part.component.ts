import { Component, Input } from '@angular/core';
import { UserDataDto } from '../../shared/dtos/user-data.dto';

@Component({
  selector: 'app-client-dashboard-part',
  templateUrl: './client-dashboard-part.component.html',
  styleUrl: './client-dashboard-part.component.scss'
})
export class ClientDashboardPartComponent {
  @Input()
  userData: UserDataDto | undefined | null = null;
}
