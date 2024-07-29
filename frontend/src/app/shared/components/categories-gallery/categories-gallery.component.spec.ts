import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesGalleryComponent } from './categories-gallery.component';

describe('CategoriesGalleryComponent', () => {
  let component: CategoriesGalleryComponent;
  let fixture: ComponentFixture<CategoriesGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
