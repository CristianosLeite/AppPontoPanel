import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopoverComponent } from './login-popover.component';

describe('LoginPopoverComponent', () => {
  let component: LoginPopoverComponent;
  let fixture: ComponentFixture<LoginPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPopoverComponent]
    });
    fixture = TestBed.createComponent(LoginPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
