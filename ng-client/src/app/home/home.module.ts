import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HomeRouting} from "./home.routing";
import {StudentTrackerService} from "./student-tracker.service";
import { ActivityTableComponent } from './activity-table/activity-table.component';


@NgModule({
  declarations: [
    HomeComponent,
    ActivityTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
