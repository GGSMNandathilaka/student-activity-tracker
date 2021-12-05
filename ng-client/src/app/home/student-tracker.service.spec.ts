import { TestBed } from '@angular/core/testing';

import { StudentTrackerService } from './student-tracker.service';

describe('StudentTrackerService', () => {
  let service: StudentTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
