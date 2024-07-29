import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWidget2Component } from './book-widget-2.component';

describe('BookWidget2Component', () => {
  let component: BookWidget2Component;
  let fixture: ComponentFixture<BookWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookWidget2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
