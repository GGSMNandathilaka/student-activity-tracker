import {Component, OnInit} from '@angular/core';
import {StudentTrackerService} from "../student-tracker.service";
import * as moment from 'moment';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {

  filterData: any;
  today = moment().format("YYYY-MM-DD");

  constructor(public trackerService: StudentTrackerService) {
  }

  ngOnInit(): void {
    this.trackerService.filterObs.subscribe(filterData => {
      if (filterData) {
        this.filterData = filterData;
      }
    })
  }

}
