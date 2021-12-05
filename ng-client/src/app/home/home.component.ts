import {Component, OnInit} from '@angular/core';
import {StudentTrackerService} from "./student-tracker.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public trackerService: StudentTrackerService) {
  }

  ngOnInit(): void {
  }

}
