import {Component, OnInit} from '@angular/core';
import {StudentTrackerService} from "../student-tracker.service";

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {

  headings = ["#", "Date Completed", "Content", "Type", "Skill", "Result", "Time Spent"];
  isDataLoaded = false;


  constructor(public trackerService: StudentTrackerService) {
  }

  ngOnInit(): void {
    this.trackerService.studentAttemptObs.subscribe(data => {
      if (data && data.length > 0) {
        this.isDataLoaded = true;
      }
    });
  }

}
