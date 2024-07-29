import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDashboardPartComponent } from './client-dashboard-part.component';

describe('ClientDashboardPartComponent', () => {
  let component: ClientDashboardPartComponent;
  let fixture: ComponentFixture<ClientDashboardPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientDashboardPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDashboardPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
