import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInterface } from './person-interface';

describe('PersonInterface', () => {
  let component: PersonInterface;
  let fixture: ComponentFixture<PersonInterface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonInterface]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonInterface);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
