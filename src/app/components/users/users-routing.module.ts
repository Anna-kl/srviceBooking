import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-user',
        component: ListUserComponent,
        data: {
          title: 'Список сотрудников',
          breadcrumb: 'Список сотрудников'
        }
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        data: {
          title: 'Добавить отрудника',
          breadcrumb: 'Добавить отрудника'
        }
      },
      {
        path: 'detail-user/:id',
        component: UserDetailComponent,
        data: {
          title: 'Страница сотрудника',
          breadcrumb: 'Страница сотрудника'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
