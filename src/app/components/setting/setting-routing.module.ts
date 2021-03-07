import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {UpdateprofileComponent} from './updateprofile/updateprofile.component';
import {ProfilestaffComponent} from './profilestaff/profilestaff.component';
import {UpdateStafComponent} from './update-staf/update-staf.component';



const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Профиль',
      breadcrumb: 'Профиль'
    }
  },
  {
    path: 'update',
    component: UpdateprofileComponent,
    data: {
      title: 'Изменить',
      breadcrumb: 'Профиль'
    }
  },
  {
    path: 'updatestaff',
    component: UpdateStafComponent,
    data: {
      title: 'Изменить',
      breadcrumb: 'Профиль'
    }
  },
  {
    path: 'profilestaff',
    component: ProfilestaffComponent,
    data: {
      title: 'Изменить',
      breadcrumb: 'Профиль'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
