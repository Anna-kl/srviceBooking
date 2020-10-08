import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../shared/shared.module';
import { RememberComponent } from './remember/remember.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [LoginComponent, RememberComponent, ConfirmComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        CarouselModule,
        FormsModule,

        // SharedModule
    ]
})
export class AuthModule { }
