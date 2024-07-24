import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSmallWidgetComponent } from './author-small-widget.component';

describe('AuthorSmallWidgetComponent', () => {
  let component: AuthorSmallWidgetComponent;
  let fixture: ComponentFixture<AuthorSmallWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorSmallWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorSmallWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
