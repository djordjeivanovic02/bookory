import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'libracorner-frontend';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd  && isPlatformBrowser(this.platformId)){
        window.scrollTo(0, 0);
      }
    })
  }

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object){}
}
