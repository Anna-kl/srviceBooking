import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../auth/login/login.component";
import {ConfirmComponent} from "../auth/confirm/confirm.component";
import {RememberComponent} from "../auth/remember/remember.component";
import {RegistrationComponent} from "../auth/registration/registration.component";
import {NgModule} from "@angular/core";
import {CalendarModule} from "./calendar.module";
import {CreatecalendarComponent} from "./createcalendar/createcalendar.component";
import {SchedulerComponent} from "./createcalendar/scheduler/scheduler.component";

const routes: Routes = [
    {
        path: '',
        component: CreatecalendarComponent,

    },
    {
        path: 'scheduler/:date',
        component: SchedulerComponent,

    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalendarRoutingModule { }
