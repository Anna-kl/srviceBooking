import { Component, OnInit } from '@angular/core';
import {AuthServices} from '../auth.services';
import {ActivatedRoute, Router} from "@angular/router";
import {Answer} from "../../../shared/class/helpers/Response";

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss'],
  providers: [AuthServices]
})
export class RememberComponent implements OnInit {
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };
  owlcarousel = [
    {
      title: 'Добро пожаловать',
      desc: 'Представляем вашему внимаю оптовую базу',
    }];
  psw: string;
  status: string;
  authflag = false;
  link: string;
  confirm: string;
  private sub: any;
  constructor(private auth: AuthServices, private router: Router, private route: ActivatedRoute) {
    // this.sub = this.route.params.subscribe(params => {
    //   const id = +params['id']; // (+) converts string 'id' to a number
    //   this.authflag = true;
    //   // this.link = id;
    //   // In a real app: dispatch action to load the details here.
    // });
  }

  ngOnInit() {
    const temp = localStorage.getItem('auth');
    if (temp !== null){
      this.authflag = true;
      this.link = temp;
    }
  }

  Remember() {
this.auth.changepassword(this.psw).subscribe(
    (result: Answer) => {
      if (result.status.code === 200) {
        this.status = 'Проверьте почту';
      } else if  (result.status.code === 404) {
        this.status = 'Такой почты нет';
      }
    }
);
  }

  Confirm() {
    if (this.psw !== this.confirm){
      this.status = 'Пароли не совпадают';

    }
    else{
      this.auth.changePsw(this.psw,this.link).subscribe(
          result => {
            if (result['status']){
              this.router.navigate(['']);
              localStorage.removeItem('auth');
            } else {
              this.status = result['responce'];
              localStorage.removeItem('auth');
            }
          }
      );
    }
    localStorage.removeItem('auth');
  }
}
