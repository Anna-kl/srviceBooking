import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import { CouponsRoutingModule } from './coupons-routing.module';
import { ListCouponComponent } from './list-coupon/list-coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import {MatTabsModule} from "@angular/material/tabs";
//import { NgDatepickerModule } from 'ng2-datepicker';


@NgModule({
  declarations: [ListCouponComponent, CreateCouponComponent],
    imports: [
        CommonModule,
        CouponsRoutingModule,
        NgbModule,
        ReactiveFormsModule,

        NgxDatatableModule,
        MatTabsModule
    ]
})
export class CouponsModule { }
