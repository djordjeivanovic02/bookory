import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterButtonComponent } from './login-register-button.component';

describe('LoginRegisterButtonComponent', () => {
  let component: LoginRegisterButtonComponent;
  let fixture: ComponentFixture<LoginRegisterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginRegisterButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRegisterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
