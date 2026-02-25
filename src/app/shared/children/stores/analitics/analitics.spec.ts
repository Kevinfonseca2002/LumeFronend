import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analitics } from './analitics';

describe('Analitics', () => {
  let component: Analitics;
  let fixture: ComponentFixture<Analitics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Analitics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Analitics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
