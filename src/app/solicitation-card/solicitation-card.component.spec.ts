import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationCardComponent } from './solicitation-card.component';

describe('SolicitationCardComponent', () => {
  let component: SolicitationCardComponent;
  let fixture: ComponentFixture<SolicitationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitationCardComponent]
    });
    fixture = TestBed.createComponent(SolicitationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
