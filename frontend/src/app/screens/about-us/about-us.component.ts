import { Component } from '@angular/core';
import { NavLink } from '../../core/interfaces/navlink.interface';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  links: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
}
