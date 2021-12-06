import {Component, OnInit} from '@angular/core';
import {StudentTrackerService} from "../student-tracker.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FilterCriteria} from "../../core/model/ui/filter-criteria";

@Component({
  selector: 'app-activity-filtering',
  templateUrl: './activity-filtering.component.html',
  styleUrls: ['./activity-filtering.component.scss']
})
export class ActivityFilteringComponent implements OnInit {

  filerFormGroup = new FormGroup(
    {
      classId: new FormControl(''),
      student: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    }
  );

  maxFromDate = '';
  minToDate = '';
  studentList: string[] = [];

  constructor(public trackerService: StudentTrackerService) {
  }

  ngOnInit(): void {
    this.filerFormGroup.valueChanges.subscribe(data => {
      if (data) {
        if (data.toDate) {
          this.maxFromDate = data.toDate;
        }
        if (data.fromDate) {
          this.minToDate = data.fromDate
        }
        this.trackerService.filterObs.next(data);
      }
    });

    this.trackerService.studentClassMapSubject.subscribe(studentClassMap => {
      if (studentClassMap && studentClassMap.size > 0) {
        this.studentList = [];
        studentClassMap.forEach((value, key) => {
          this.studentList.push(key);
        })
      }
    })

  }

}
