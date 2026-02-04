import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContact } from './search-contact';

describe('SearchContact', () => {
  let component: SearchContact;
  let fixture: ComponentFixture<SearchContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
