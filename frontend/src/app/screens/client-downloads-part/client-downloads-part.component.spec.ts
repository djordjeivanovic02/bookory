import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDownloadsPartComponent } from './client-downloads-part.component';

describe('ClientDownloadsPartComponent', () => {
  let component: ClientDownloadsPartComponent;
  let fixture: ComponentFixture<ClientDownloadsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientDownloadsPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDownloadsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
