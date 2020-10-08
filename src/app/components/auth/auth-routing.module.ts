import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RememberComponent} from './remember/remember.component';
import {ConfirmComponent} from './confirm/confirm.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
    {
        path: 'confirm',
        component: ConfirmComponent,

    },
  {
    path: 'remember',
    component: RememberComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
