import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveWfhApllicationComponent } from './leave-wfh-apllication-component';

describe('LeaveWfhApllicationComponent', () => {
  let component: LeaveWfhApllicationComponent;
  let fixture: ComponentFixture<LeaveWfhApllicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveWfhApllicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveWfhApllicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
