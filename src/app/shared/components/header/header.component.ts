import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import {Answer} from "../../class/helpers/Response";
import {SendAcount} from "../../class/account/SendAcount";
import {DataServices} from "../../service/data.services";
import {SendAuth} from "../../class/auth/SendAuth";
import {AccountServices} from "../../service/accountservices";
import {DomSanitizer} from "@angular/platform-browser";
import {StaffServices} from '../../service/staff.services';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AccountServices, StaffServices]
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();
  private auth: SendAuth;
  img: any;

  constructor(public navServices: NavService, private  dataservices: DataServices,
              private  accountSer: AccountServices, private sanitizer: DomSanitizer,
              private staffservices: StaffServices, private route: Router) { }

  collapseSidebar() {
    this.open = !this.open;

    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }


  ngOnInit() {
    this.dataservices.users.subscribe(result => {this.auth = result;
    if (this.auth.role === 'owner') {
      this.accountSer.getUserpic(this.auth.token).subscribe(
          result1 => {
            const unsafeImageUrl = URL.createObjectURL(result1);
            this.img = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
            this.dataservices.SendUserpic(this.img);
          });
    } else {
      this.staffservices.getUserpic(this.auth.token, this.auth.accountid).subscribe(
          result1 => {
            const unsafeImageUrl = URL.createObjectURL(result1);
            this.img = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
            this.dataservices.SendUserpic(this.img);
          });
    }
  });
  }
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.img = reader.result;
      console.log(this.img);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ChangePage() {
    if (this.auth.role === 'owner') {
      this.route.navigate(['settings/update']);
    } else {
     this.route.navigate(['settings/updatestaff']);
    }
  }
}
