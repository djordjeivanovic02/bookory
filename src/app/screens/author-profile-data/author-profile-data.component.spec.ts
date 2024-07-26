import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorProfileDataComponent } from './author-profile-data.component';

describe('AuthorProfileDataComponent', () => {
  let component: AuthorProfileDataComponent;
  let fixture: ComponentFixture<AuthorProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorProfileDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
