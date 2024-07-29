import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorWidget1Component } from './author-widget-1.component';

describe('AuthorWidget1Component', () => {
  let component: AuthorWidget1Component;
  let fixture: ComponentFixture<AuthorWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorWidget1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
