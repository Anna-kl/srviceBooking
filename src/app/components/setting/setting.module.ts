import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule, NgbNavItem, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import { ProfilestaffComponent } from './profilestaff/profilestaff.component';
import { UpdateStafComponent } from './update-staf/update-staf.component';
import {RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
  declarations: [ProfileComponent, UpdateprofileComponent, ProfilestaffComponent, UpdateStafComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingRoutingModule,
    SharedModule,
    AngularMultiSelectModule,
    FormsModule,
    MatTabsModule
  ]
})
export class SettingModule { }
