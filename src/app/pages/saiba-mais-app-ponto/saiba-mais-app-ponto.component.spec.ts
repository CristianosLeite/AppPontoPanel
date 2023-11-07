import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaibaMaisAppPontoComponent } from './saiba-mais-app-ponto.component';

describe('SaibaMaisAppPontoComponent', () => {
  let component: SaibaMaisAppPontoComponent;
  let fixture: ComponentFixture<SaibaMaisAppPontoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaibaMaisAppPontoComponent]
    });
    fixture = TestBed.createComponent(SaibaMaisAppPontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
