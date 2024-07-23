import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadtagComponent } from './headtag.component';

describe('HeadtagComponent', () => {
  let component: HeadtagComponent;
  let fixture: ComponentFixture<HeadtagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadtagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
