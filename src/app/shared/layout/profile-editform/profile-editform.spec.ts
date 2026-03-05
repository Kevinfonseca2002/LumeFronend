import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditform } from './profile-editform';

describe('ProfileEditform', () => {
  let component: ProfileEditform;
  let fixture: ComponentFixture<ProfileEditform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
