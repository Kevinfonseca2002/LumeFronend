import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewForm } from './user-new-form';

describe('UserNewForm', () => {
  let component: UserNewForm;
  let fixture: ComponentFixture<UserNewForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNewForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
