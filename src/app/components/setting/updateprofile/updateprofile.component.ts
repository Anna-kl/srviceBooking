import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category, MultiCategery} from '../../../shared/class/category/Category';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {SendAcount} from '../../../shared/class/account/SendAcount';
import {CategoryServices} from '../../../shared/service/category.services';
import {AccountServices} from '../../../shared/service/accountservices';
import {DataServices} from '../../../shared/service/data.services';
import {Router} from '@angular/router';
import {Answer} from '../../../shared/class/helpers/Response';
import Swal from 'sweetalert2';
import {EmployeeOwner} from '../../../shared/class/staff/EmployeeOwner';
import {StaffServices} from '../../../shared/service/staff.services';
import {SendEmployee} from '../../../shared/class/staff/SendEmployee';
import {ListItem} from "ng-multiselect-dropdown/multiselect.model";

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss'],
  providers: [CategoryServices, AccountServices, StaffServices]
})
export class UpdateprofileComponent implements OnInit  {
  public accountForm: FormGroup;
  public staffForm: FormGroup;
  public permissionForm: FormGroup;

  public mainCategory: Category[];
  choose = 'Выберите категорию';
  main = 'Выберите категорию';
  selectedItems: any;
   dropdownSettings: any;
   dropdownSubSettings: any;
   list: any;
  subcat = false;
  sublist: any;
  selectedSubItems: any;
  subflag = false;
  auth: SendAuth;
  account: SendAcount;
  private staffAccount: SendEmployee;
  dropdownList: any;
  selectedItems1: any;
  constructor(private formBuilder: FormBuilder, private categorys: CategoryServices, private staffservices: StaffServices,
              private accountSer: AccountServices, private dataservices: DataServices,  private router: Router, ) {

    this.createPermissionForm();
  }

  createAccountForm(account: SendAcount) {
    this.accountForm = this.formBuilder.group({
      name: [account.name],
      address: [account.address],
      phone: [account.phone],
      email: [account.email, Validators.email],
      level0: [''],
      level1: [''],
    });
  }
  createstaffForm(account: EmployeeOwner, work: SendAcount) {
    this.staffForm = this.formBuilder.group({
      firstname: [account.firstname],
      // lastname: [account.lastname],
  //    phone: [account.phone],
  //     email: [account.email, Validators.email],
  //     work: [work.name],

    });
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    });
  }
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
  ngOnInit() {
      // this.selectedItems1 = [
      //     { item_id: 3, item_text: 'Pune' },
      //     { item_id: 4, item_text: 'Navsari' }
      // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id_item',
      textField: 'item_text',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.createStaffForm();
    this.dataservices.users.subscribe(result => {this.auth = result;
    // if (this.auth.role === 'staff'){
    //   this.staffForm = this.formBuilder.group(
    //       { firstname: ''}
    //   );account
    // }
                                                 this.accountSer.getAccount(this.auth.accountid, this.auth.token).subscribe(
              (result1: Answer) => {
                if (result1.status.code === 200) {


                    this.account = result1.responce as SendAcount;
                    this.createAccountForm(this.account );
                    this.categorys.getGeneral().subscribe(
                        (result2: Answer) => {
                          this.mainCategory = result2.responce as Category[];
                          if (this.account.level0 === 0) {
                            this.list = this.mainCategory.map((item) => {
                              return {
                                id: item.id,
                                itemName: item.name
                              };
                            }); } else if (this.account.level1 !== 0) {
                            this.subflag = true;
                            this.accountForm.patchValue( {level0: this.mainCategory.find(x=>x.id === this.account.level0).name})
                            this.categorys.getSubCategory(1, this.account.level0).subscribe(
                                (result_c:Answer)=>{
                                    const temp = result_c.responce as Category[];
                                    this.dropdownList=[];
                                    temp.map(a=>{
                                        this.dropdownList.push({id_item: a.id, item_text: a.name });
                                    })
                                }
                            )
                              this.categorys.getSubCategoryBissness(this.auth.token).subscribe(
                                (result3: Answer) => {
                                  if (result3.status.code === 200) {
                                    this.subcat = true;

                                    const SubCategory = result3.responce as Category[];
                                    // this.accountForm.patchValue({level0: this.mainCategory.find(x =>
                                    //       x.id === this.account.level0).name,
                                    //   level1: SubCategory.find(x => x.id === this.account.level1).name});

                                      // this.dropdownList = [
                                      //     { item_id: 1, item_text: 'Mumbai' },
                                      //     { item_id: 2, item_text: 'Bangaluru' },
                                      //     { item_id: 3, item_text: 'Pune' },
                                      //     { item_id: 4, item_text: 'Navsari' },
                                      //     { item_id: 5, item_text: 'New Delhi' }
                                      // ];

this.selectedItems1=[];
                                      for (const i of SubCategory) {
                                          this.selectedItems1.push({id_item: i.id, item_text:i.name});
                                    // this.selectedItems1.push({id_item: i.id, item_text:i.name});
                                   }
                                  //  this.dropdownList.push(new MultiCategery(SubCategory[0]));
                                  }
                                }
                            );

                          } else {
                            this.subcat = true;
                          }
                        }
                    );
                  }
              }); },
        error1 => console.log()
    );
    // this.dropdownSettings = {
    //   singleSelection: true,
    //   text: 'Выберите категорию',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   enableSearchFilter: true,
    //   classes: 'myclass custom-class'
    // };
    // this.dropdownSubSettings = {
    //   singleSelection: true,
    //   text: 'Выберите подкатегорию',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   enableSearchFilter: true,
    //   classes: 'myclass custom-class'
    // };

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
  onSubmit() {
    const data = this.accountForm.getRawValue();
    const send = new SendAcount(this.selectedItems[0].id, this.selectedSubItems[0].id,
        data.name, data.address, data.email, data.phone);
    this.accountSer.updateAccount(send, this.auth.token).subscribe(
        (result: Answer) => {
          if (result.status.code === 200) {
            this.position('Изменения сохранены');
            this.router.navigate(['/settings/profile']);
          } else {
            this.noposition(result.status.message);
          }
        }
    );
  }

  SelectLevel() {
    console.log();
  }

  onItemSelect($event: any) {
    this.categorys.getSubCategory(1, this.selectedItems[0].id).subscribe(
        (result: Answer) => {
          if (result.status.code === 200) {
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

  uploadFile($event) {
    const  filelist: FileList = $event.target.files;
    const  file: File = filelist[0];
    this.accountSer.uploadUserPic(this.auth.token, file).subscribe(
        (result: Answer) => {
          if (result.status.code === 200) {
            this.position('Изображение сохранено');
          } else {
            this.noposition(result.status.message);
          }
        }
    );
  }


    onSelectAll($event: Array<ListItem>) {

    }

    onItemSelect1($event: ListItem) {
         // this.selectedItems1.push(  $event);
    }

    UpdateCategory() {
      const items = [];
      this.selectedItems1.map(a=>{
          items.push(new Category(a.id_item, 1, a.item_text, this.account.level0));
      })
        this.accountSer.updateCategory(this.auth.token, items).subscribe(
            (result: Answer) => {
                if (result.status.code === 200){
                    this.position('Категории обновлены');
                }
            }
        )
    }
}
