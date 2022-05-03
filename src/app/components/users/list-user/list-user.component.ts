import { Component, OnInit } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';
import {DataServices} from '../../../shared/service/data.services';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {StaffServices} from '../../../shared/service/staff.services';
import {Answer} from '../../../shared/class/helpers/Response';
import {EmployeeOwner} from '../../../shared/class/staff/EmployeeOwner';
import {StaffSend} from '../../../shared/class/staff/staffSend';
import {DomSanitizer} from '@angular/platform-browser';

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [StaffServices]
})
export class ListUserComponent implements OnInit {
     source: LocalDataSource;
  constructor(private dataservices: DataServices, private sraffservice: StaffServices,
              private sanitizer: DomSanitizer, private router: Router) {}
  private user: SendAuth;
  public user_list: StaffSend[];
  public testdata: StaffSend[];
  public settings = {
      selectMode: 'single',
      delete: {
          confirmDelete: true,
        },
      columns: {
          name: {
            title: 'name',
          },
          email: {
            title: 'Email'
          },
          lastvisit: {
            title: 'Last Login'
          },
          role: {
            title: 'Role'
          },
    },
  };
              public LoadData(): void {

                  this.dataservices.users.subscribe(result => {
                      this.user = result;
                      this.sraffservice.getAccount(this.user.token).subscribe(
                          (result1: Answer) => {
                              this.user_list = result1.responce as StaffSend[];
                              this.source = new LocalDataSource(this.user_list);
                              // this.user_list.forEach(a => {
                              //     this.sraffservice.getUserpic(this.user.token, a.id).subscribe(
                              //         result2 => {
                              //             try {
                              //                 const unsafeImageUrl = URL.createObjectURL(result2);
                              //                 const url_image = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl)
                              //
                              //                 this.source = new LocalDataSource(this.user_list);
                              //             } catch (e) {
                              //                 a.avatar = "<img src='assets/images/user.png' class='imgTable'>"
                              //                 this.source = new LocalDataSource(this.user_list);
                              //             }
                              //         }
                              //     );
                              // });
                             // create the source
                              //  this.user_list[0].avatar = "<img src='assets/images/dashboard/user5.jpg' class='imgTable'>";
                              });
                          },
                      error => console.log(error));
              }


  ngOnInit() {
this.LoadData();

//      this.user_list = userListDB.list_user;
  }

    onUserRowSelect($event: any) {
                  const data = $event.data;
                  this.router.navigate(['/users/detail-user', data['id']]);
    }

    onRoleDelete($event: any) {
        console.log($event);
    }
}

