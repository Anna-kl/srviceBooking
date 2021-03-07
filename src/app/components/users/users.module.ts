import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersRoutingModule } from './users-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import { UserDetailComponent } from './user-detail/user-detail.component';
import {GalleryModule} from "@ks89/angular-modal-gallery";

@NgModule({
  declarations: [ListUserComponent, CreateUserComponent, UserDetailComponent],
    imports: [
        CommonModule,
        NgbModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        FormsModule,
        AngularMultiSelectModule,
        GalleryModule
    ]
})
export class UsersModule { }
