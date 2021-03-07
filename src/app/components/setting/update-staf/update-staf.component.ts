import { Component, OnInit } from '@angular/core';
import {Answer} from '../../../shared/class/helpers/Response';
import {SendEmployee} from '../../../shared/class/staff/SendEmployee';
import {StaffServices} from '../../../shared/service/staff.services';
import {DataServices} from '../../../shared/service/data.services';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {EmployeeOwner} from "../../../shared/class/staff/EmployeeOwner";
import Swal from "sweetalert2";
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-staf',
  templateUrl: './update-staf.component.html',
  styleUrls: ['./update-staf.component.scss'],
  providers: [StaffServices]
})
export class UpdateStafComponent implements OnInit {
  private auth: SendAuth;
  private staffForm: FormGroup;
  private staffAccount: SendEmployee;

  constructor(private staffservice: StaffServices, private dataservices: DataServices,
              private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.createStaffForm();
    this.dataservices.users.subscribe(result => {this.auth = result;
                                                 this.staffservice.getStaff(this.auth.token, this.auth.accountid).subscribe(
          (result2: Answer) => {
            if (result2.status.code === 200) {
              this.staffAccount = result2.responce as SendEmployee;
              this.staffForm.setValue({firstname: this.staffAccount.firstname,
                lastname: this.staffAccount.lastname, email: this.staffAccount.email,
                work: this.staffAccount.work, phone: this.staffAccount.phone});
              //     if ()
              //     this.createstaffForm(this.staffAccount, this.account);
            }
          }
      ); });
    }
  onSubmitStaff() {
    const d = this.staffForm.getRawValue() as EmployeeOwner;
    this.staffservice.updateStaff(this.auth.token, d).subscribe(
        (result: Answer) => {
          if (result.status.code === 200) {
            this.position('Изменены сохранены');
            this.route.navigate(['/settings/profilestaff']);
          } else {
            this.noposition(result.status.message);
          }
        }
    );
  }
  position(text: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    }); }
  noposition(text: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: text,
      showConfirmButton: false,
      timer: 1500
    }); }
createStaffForm() {
  this.staffForm = this.formBuilder.group(
      {
        firstname: new FormControl(),
        lastname: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        work: new FormControl(),
      }
  );
}

}
