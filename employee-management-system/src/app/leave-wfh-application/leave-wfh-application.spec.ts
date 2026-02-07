import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveWfhApplication } from './leave-wfh-application';

describe('LeaveWfhApplication', () => {
  let component: LeaveWfhApplication;
  let fixture: ComponentFixture<LeaveWfhApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveWfhApplication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveWfhApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
