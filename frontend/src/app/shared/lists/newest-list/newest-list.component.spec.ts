import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestListComponent } from './newest-list.component';

describe('NewestListComponent', () => {
  let component: NewestListComponent;
  let fixture: ComponentFixture<NewestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
