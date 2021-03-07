import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangeSheduleComponent } from './change-shedule/change-shedule.component';

@NgModule({
  declarations: [InvoiceComponent, ChangeSheduleComponent],
    imports: [
        CommonModule,
        InvoiceRoutingModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class InvoiceModule { }
