import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInterface } from './store-interface';

describe('StoreInterface', () => {
  let component: StoreInterface;
  let fixture: ComponentFixture<StoreInterface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreInterface]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreInterface);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
