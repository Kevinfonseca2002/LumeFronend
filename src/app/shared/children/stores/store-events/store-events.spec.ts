import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEvents } from './store-events';

describe('StoreEvents', () => {
  let component: StoreEvents;
  let fixture: ComponentFixture<StoreEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
