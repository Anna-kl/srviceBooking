import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryServices} from '../../../shared/service/category.services';
import {consoleTestResultHandler} from "tslint/lib/test";
import {Answer} from '../../../shared/class/helpers/Response';
import {Category} from '../../../shared/class/category/Category';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [CategoryServices]
})
export class CreateUserComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
public mainCategory: Category[];
  choose = 'Выберите категорию';
  main='Выберите категорию';
  constructor(private formBuilder: FormBuilder, private categorys: CategoryServices) {
    this.createAccountForm();
    this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      main: [''],
      address: [''],
      phone: [''],
      email: ['', Validators.email],
      password: ['', Validators.minLength(8)],
      confirmPwd: ['']
    });
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    });
  }

  ngOnInit() {
    this.categorys.getGeneral(0).subscribe(
        (result: Answer) => {
          this.mainCategory = result.responce as Category[];
        }
    );
  }

  onSubmit() {

  }

  SelectLevel() {
    console.log();
  }
}
