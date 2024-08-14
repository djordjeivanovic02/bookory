import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAuthorsListComponent } from './best-authors-list.component';

describe('BestAuthorsListComponent', () => {
  let component: BestAuthorsListComponent;
  let fixture: ComponentFixture<BestAuthorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestAuthorsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestAuthorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
