import { TestBed } from '@angular/core/testing';

import { HttpUsers } from './http-users';

describe('HttpUsers', () => {
  let service: HttpUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
