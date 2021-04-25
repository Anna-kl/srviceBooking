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
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import {AgmCoreModule} from "@agm/core";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";



@NgModule({
  declarations: [ProfileComponent, UpdateprofileComponent, ProfilestaffComponent, UpdateStafComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SettingRoutingModule,
        SharedModule,
        AngularMultiSelectModule,
        FormsModule,
        MatTabsModule,
        NgMultiSelectDropDownModule.forRoot(),
        GooglePlaceModule,
        MatInputModule,
        MatGoogleMapsAutocompleteModule,
        AgmCoreModule,
        FlexModule,
        ExtendedModule,
        MatOptionModule,
        MatAutocompleteModule
    ]
})
export class SettingModule { }
