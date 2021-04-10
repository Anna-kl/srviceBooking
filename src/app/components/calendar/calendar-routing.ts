import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../auth/login/login.component";
import {ConfirmComponent} from "../auth/confirm/confirm.component";
import {RememberComponent} from "../auth/remember/remember.component";
import {RegistrationComponent} from "../auth/registration/registration.component";
import {NgModule} from "@angular/core";
import {CalendarModule} from "./calendar.module";
import {CreatecalendarComponent} from "./createcalendar/createcalendar.component";

const routes: Routes = [
    {
        path: '',
        component: CreatecalendarComponent,

    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalendarRoutingModule { }
