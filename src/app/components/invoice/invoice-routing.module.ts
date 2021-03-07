import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import {ChangeSheduleComponent} from "./change-shedule/change-shedule.component";


const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    data: {
      title: 'Мое расписание',
      breadcrumb: 'Расписание'
    }
  },
  {
    path: 'change/:id',
    component: ChangeSheduleComponent,
    data: {
      title: 'Просмотр расписания',
      breadcrumb: 'Расписание'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
