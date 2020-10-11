import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryServices} from '../../../shared/service/category.services';
import {consoleTestResultHandler} from "tslint/lib/test";
import {Answer} from '../../../shared/class/helpers/Response';
import {Category} from '../../../shared/class/category/Category';
import {Itemslist} from "../../../shared/class/category/Itemslist";

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
  main = 'Выберите категорию';
  selectedItems: any;
  private dropdownSettings: any;
    private dropdownSubSettings: any;
  private list: any;
    subcat = false;
    sublist: any;
    selectedSubItems: any;
    subflag = false;
  constructor(private formBuilder: FormBuilder, private categorys: CategoryServices) {
    this.createAccountForm();
    this.createPermissionForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
      email: ['', Validators.email],
      desc: [''],
    });
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    });
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      text: 'Выберите категорию',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.dropdownSubSettings = {
          singleSelection: true,
          text: 'Выберите подкатегорию',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          enableSearchFilter: true,
          classes: 'myclass custom-class'
      };
    this.categorys.getGeneral().subscribe(
        (result: Answer) => {
          this.mainCategory = result.responce as Category[];
          this.list = this.mainCategory.map((item) => {
            return {
              id: item.id,
              itemName: item.name
            };
          });
        }
    );
  }

  onSubmit() {

  }

  SelectLevel() {
    console.log();
  }

  onItemSelect($event: any) {
    this.categorys.getSubCategory(1, this.selectedItems[0].id).subscribe(
        (result: Answer) => {
            if (result.status.code === 200){
                this.subcat = true;
                this.mainCategory = result.responce as Category[];
                this.sublist = this.mainCategory.map((item) => {
                    return {
                        id: item.id,
                        itemName: item.name
                    };
                });
            }
        }
    );
  }

  OnItemDeSelect($event: any) {
    
  }

    onItemSubSelect($event: any) {
this.subflag = true;
    }
}
