import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWidget1Component } from './book-widget-1.component';

describe('BookWidget1Component', () => {
  let component: BookWidget1Component;
  let fixture: ComponentFixture<BookWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookWidget1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
