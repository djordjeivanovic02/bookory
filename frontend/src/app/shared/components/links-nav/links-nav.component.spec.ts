import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksNavComponent } from './links-nav.component';

describe('LinksNavComponent', () => {
  let component: LinksNavComponent;
  let fixture: ComponentFixture<LinksNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinksNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinksNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
