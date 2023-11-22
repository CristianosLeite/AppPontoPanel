import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUserResgistrationComponent } from './end-user-resgistration.component';

describe('EndUserResgistrationComponent', () => {
  let component: EndUserResgistrationComponent;
  let fixture: ComponentFixture<EndUserResgistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndUserResgistrationComponent]
    });
    fixture = TestBed.createComponent(EndUserResgistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
