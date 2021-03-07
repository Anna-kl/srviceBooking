import { Component, OnInit } from '@angular/core';
import { Account} from '../../../shared/class/account/Account';
import {Answer} from '../../../shared/class/helpers/Response';
import {SendAcount} from '../../../shared/class/account/SendAcount';
import {DataServices} from '../../../shared/service/data.services';
import {AccountServices} from '../../../shared/service/accountservices';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {FormBuilder, Validators} from '@angular/forms';
import {EmployeeOwner} from "../../../shared/class/staff/EmployeeOwner";
import {StaffServices} from "../../../shared/service/staff.services";
import {SendEmployee} from "../../../shared/class/staff/SendEmployee";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AccountServices, StaffServices]
})
export class ProfileComponent implements OnInit {
    account: SendAcount;
  private auth: SendAuth;
  private accountForm: any;
  img: any;
  staff: SendEmployee;

  constructor( private dataservices: DataServices, private accountSer: AccountServices,
               private formBuilder: FormBuilder, private staffservice: StaffServices) { }

  ngOnInit() {
    this.dataservices.userpics.subscribe(result => this.img = result);

    this.dataservices.users.subscribe(result => {this.auth = result;
    { this.accountSer.getAccount(this.auth.accountid, this.auth.token).subscribe(
              (result1: Answer) => {
                if (result1.status.code === 200) {

                  this.account = result1.responce as SendAcount; }
              }); } }
    );

    }


  createAccountForm(account: SendAcount) {
    this.accountForm = this.formBuilder.group({
      name: [account.name],
      address: [account.address],
      phone: [account.phone],
      email: [account.email, Validators.email],
      desc: [''],
    });
  }

}
