import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import {RememberComponent} from './components/auth/remember/remember.component';
import {ConfirmComponent} from './components/auth/confirm/confirm.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'users/create-user',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: LoginComponent,

  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,

  },
  {
    path: 'remember',
    component: RememberComponent,
  },
  {
    path: 'confirm',
    component: ConfirmComponent,

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', useHash:true
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
