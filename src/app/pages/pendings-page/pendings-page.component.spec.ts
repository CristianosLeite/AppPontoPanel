import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingsPageComponent } from './pendings-page.component';

describe('PendingsPageComponent', () => {
  let component: PendingsPageComponent;
  let fixture: ComponentFixture<PendingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingsPageComponent]
    });
    fixture = TestBed.createComponent(PendingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
