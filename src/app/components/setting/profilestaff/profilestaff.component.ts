import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../shared/class/helpers/Response";
import {SendAcount} from "../../../shared/class/account/SendAcount";
import {SendEmployee} from "../../../shared/class/staff/SendEmployee";
import {DataServices} from "../../../shared/service/data.services";
import {StaffServices} from "../../../shared/service/staff.services";
import {SendAuth} from "../../../shared/class/auth/SendAuth";
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {IndicatorServices} from "../../../shared/service/indicator.service";
import {StaffIndicator} from "../../../shared/class/indicators/StaffIndicator";
@Component({
  selector: 'app-profilestaff',
  templateUrl: './profilestaff.component.html',
  styleUrls: ['./profilestaff.component.scss'],
  providers: [StaffServices, IndicatorServices ]
})
export class ProfilestaffComponent implements OnInit {
  private auth: SendAuth;
  staff: SendEmployee;
  img: any;
  mainIn: StaffIndicator;

  constructor(private dataservices: DataServices, private staffservice: StaffServices, private indicator: IndicatorServices) {
  }

  ngOnInit() {
    this.dataservices.userpics.subscribe(result => this.img = result);

    this.dataservices.users.subscribe(result => {
      this.auth = result;

      this.staffservice.getStaff(this.auth.token, this.auth.accountid).subscribe(
          (result1: Answer) => {
            if (result1.status.code === 200) {
              this.staff = result1.responce as SendEmployee;
            }
          }
      );
    });
this.indicator.getStaffIndividual(this.auth.token).subscribe(
    (result: Answer) => {
      if (result.status.code === 200){
        this.mainIn = result.responce as StaffIndicator;
      }
    }
)

  }
}
