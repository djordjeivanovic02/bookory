import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWidget3Component } from './book-widget-3.component';

describe('BookWidget3Component', () => {
  let component: BookWidget3Component;
  let fixture: ComponentFixture<BookWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookWidget3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
