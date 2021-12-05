import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HomeRouting} from "./home.routing";
import {StudentTrackerService} from "./student-tracker.service";
import {ActivityTableComponent} from './activity-table/activity-table.component';
import {ScoreHighlightDirective} from "./activity-table/directives/score-highlight.directive";
import {ActivityFilteringComponent} from "./activity-filtering/activity-filtering.component";
import { StudentReportComponent } from './student-report/student-report.component';


@NgModule({
  declarations: [
    HomeComponent,
    ActivityTableComponent,
    ScoreHighlightDirective,
    ActivityFilteringComponent,
    StudentReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRouting,
    SharedModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    StudentTrackerService
  ]
})
export class HomeModule {
}
