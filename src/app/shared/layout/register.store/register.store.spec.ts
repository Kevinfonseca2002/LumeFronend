import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStore } from './register.store';

describe('RegisterStore', () => {
  let component: RegisterStore;
  let fixture: ComponentFixture<RegisterStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
