import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRegistration } from './finish-registration';

describe('EndUserResgistrationComponent', () => {
  let component: FinishRegistration;
  let fixture: ComponentFixture<FinishRegistration>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishRegistration]
    });
    fixture = TestBed.createComponent(FinishRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
