import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatecalendarComponent, MultipleIconsDialogComponent} from './createcalendar/createcalendar.component';
import {CalendarRoutingModule} from './calendar-routing';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {OverlayModule} from "@angular/cdk/overlay";
import {ReactiveFormsModule} from '@angular/forms';
import {SchedulerComponent} from './createcalendar/scheduler/scheduler.component';
import {DayPilotModule} from "daypilot-pro-angular";



@NgModule({
  declarations: [CreatecalendarComponent, MultipleIconsDialogComponent, SchedulerComponent],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        TranslateModule.forRoot(),
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        OverlayModule,
        MatDialogModule,
        ReactiveFormsModule,
        DayPilotModule
    ],
  providers: [MatDialog ]
})
export class CalendarModule { }
