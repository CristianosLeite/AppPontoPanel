import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningPromptComponent } from './warning-prompt.component';

describe('WarningPromptComponent', () => {
  let component: WarningPromptComponent;
  let fixture: ComponentFixture<WarningPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningPromptComponent]
    });
    fixture = TestBed.createComponent(WarningPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
