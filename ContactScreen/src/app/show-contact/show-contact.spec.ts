import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContact } from './show-contact';

describe('ShowContact', () => {
  let component: ShowContact;
  let fixture: ComponentFixture<ShowContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
