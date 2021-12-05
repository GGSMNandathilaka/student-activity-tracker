import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./shared/login/login.component";
import {SignUpComponent} from "./shared/sign-up/sign-up.component";
import {AuthGuard} from "./core/route-guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../../ng-client/src/app/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
