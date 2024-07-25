import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileDataComponent } from './client-profile-data.component';

describe('ClientProfileDataComponent', () => {
  let component: ClientProfileDataComponent;
  let fixture: ComponentFixture<ClientProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
