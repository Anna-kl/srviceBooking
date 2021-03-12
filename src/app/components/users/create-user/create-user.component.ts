import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryServices} from '../../../shared/service/category.services';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {Answer} from '../../../shared/class/helpers/Response';
import {Category} from '../../../shared/class/category/Category';
import {AccountServices} from '../../../shared/service/accountservices';
import {DataServices} from '../../../shared/service/data.services';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {SendAcount} from '../../../shared/class/account/SendAcount';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {StaffServices} from '../../../shared/service/staff.services';
import {DomSanitizer} from '@angular/platform-browser';
import {EmployeeOwner} from '../../../shared/class/staff/EmployeeOwner';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [ StaffServices]
})
export class CreateUserComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
public mainCategory: Category[];
  choose = 'Выберите категорию';
  main = 'Выберите категорию';
  imgflag = false;
  private dropdownSettings: any;
    private dropdownSubSettings: any;
  private list: any;
    subcat = false;
    sublist: any;
    selectedSubItems: any;
    subflag = false;
    private auth: SendAuth;
    private account: SendAcount;
    img: string | ArrayBuffer | null = '';
    private user: SendAuth;
    private file: any;
  constructor(private formBuilder: FormBuilder,
              private accountSer: StaffServices, private dataservices: DataServices,  private router: Router,
              private sanitizer: DomSanitizer) {

    this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      first: ['', Validators.required],
        last: '',
        middle: '',
      phone: ['', Validators.minLength(8)],
      email: ['', Validators.email],
        birthday: ['']
    });
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    });
  }

  ngOnInit() {
      this.dataservices.users.subscribe(result => {
          this.user = result;
      });
      this.createAccountForm();
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

    onSubmit($event: any) {
    console.log();

    const data = this.accountForm.getRawValue();
    if (data['phone'] === '') {
        data['phone'] = null;
    }
    if (data['middle'] === '') {
            data['middle'] = null;
        }
    if (data['last'] === '') {
            data['last'] = null;
        }
    if (data['birthday'] === '') {
            data['birthday'] = null;
        }

    const employee = new EmployeeOwner(data['first'], data['last'], data['middle'],
        data['phone'], data['email'], new Date(data['birthday']), 0);
    this.accountSer.addAccount(this.user.token, employee).subscribe(
        (result: Answer) => {
            if (result.status.code === 201) {
                this.position('Аккаунт добавлен');
                if (this.imgflag === true){
                    const account = result.responce as EmployeeOwner;
                    this.accountSer.uploadUserPic(this.user.token, account.id, this.file).subscribe(
                        (result1: Answer) => {
                            this.position('Аватар добавлен');
                        },
                    error1 => console.log(error1)
                    );

                }
            } else{
                if (result.status.code === 400){
                    this.noposition(result.status.message);
                }
            }
        },
        error => console.log(error)
    );
  }



    uploadFile(event) {
        const  filelist: FileList = event.target.files;
        this.file = filelist[0];
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = ($event) => { // called once readAsDataURL is completed
                this.img = $event.target['result'];
                this.imgflag = true;
            };
        }
    }
}
