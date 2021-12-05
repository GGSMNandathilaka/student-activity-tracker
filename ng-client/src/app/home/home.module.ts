import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HomeRouting} from "./home.routing";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRouting,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
