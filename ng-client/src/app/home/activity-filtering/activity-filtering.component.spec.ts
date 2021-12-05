import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFilteringComponent } from './activity-filtering.component';

describe('ActivityFilteringComponent', () => {
  let component: ActivityFilteringComponent;
  let fixture: ComponentFixture<ActivityFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityFilteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
