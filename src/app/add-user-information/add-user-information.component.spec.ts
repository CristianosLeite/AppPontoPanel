import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInformationComponent } from './add-user-information.component';

describe('AddUserInformationComponent', () => {
  let component: AddUserInformationComponent;
  let fixture: ComponentFixture<AddUserInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserInformationComponent]
    });
    fixture = TestBed.createComponent(AddUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
