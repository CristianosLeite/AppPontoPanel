import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsAreaComponent } from './records-area.component';

describe('RecordsAreaComponent', () => {
  let component: RecordsAreaComponent;
  let fixture: ComponentFixture<RecordsAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsAreaComponent]
    });
    fixture = TestBed.createComponent(RecordsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
