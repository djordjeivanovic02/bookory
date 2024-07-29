import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorMyBooksComponent } from './author-my-books.component';

describe('AuthorMyBooksComponent', () => {
  let component: AuthorMyBooksComponent;
  let fixture: ComponentFixture<AuthorMyBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorMyBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorMyBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
