import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './screens/navi/navi.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IndexComponent } from './screens/index/index.component';
import { Button1Component } from './shared/components/button1/button1.component';
import { TutorialItemComponent } from './shared/components/tutorial-item/tutorial-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    IndexComponent,
    Button1Component,
    TutorialItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
