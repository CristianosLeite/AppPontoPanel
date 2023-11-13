import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToolBarComponent } from './users-tool-bar.component';

describe('UsersToolBarComponent', () => {
  let component: UsersToolBarComponent;
  let fixture: ComponentFixture<UsersToolBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersToolBarComponent]
    });
    fixture = TestBed.createComponent(UsersToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
