import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServices} from '../auth.services';
import {Router} from '@angular/router';
import {Answer} from '../../../shared/class/helpers/Response';
import Swal from 'sweetalert2';
import {Token} from '../../../shared/class/auth/Token';
import {DataServices} from '../../../shared/service/data.services';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {CookieService} from "ngx-cookie-service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthServices]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public tokens: Token;
  public auth = false;


  constructor(private formBuilder: FormBuilder, private  authservice: AuthServices,
              private router: Router, private dataservies: DataServices) {
    this.createLoginForm();

  }

  owlcarousel = [
    {
      title: 'Добро пожаловать',
      desc: 'Представляем вашему внимаю оптовую базу',
    },
    // {
    //   title: "Welcome to Multikart",
    //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    // },
    // {
    //   title: "Welcome to Multikart",
    //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    // }
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };
  foods = ['Выберите тип', 'Собственник', 'Сотрудник'];
  choose = 'Выберите тип';

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: '',
      password: '',
      error: '',
    });
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
  TokensData() {
    this.authservice.getAuth(this.loginForm.get('userName').value, this.loginForm.get('password').value, this.choose).subscribe(
        (result: Answer) => {
          if (result.status.code === 200) {
            const user = result.responce as SendAuth;
            this.authservice.setCookie(JSON.stringify(user));
            this.dataservies.SendAccount(user);
            if (user.isfilled) {
              if (user.role === 'owner') {
              this.router.navigate(['/dashboard/default']);
              } else {
                this.router.navigate(['/settings/profilestaff']);
              }
            } else {
                if (user.role === 'owner') {
              this.router.navigate(['/settings/update']);
                } else {
                    this.router.navigate(['/settings/updatestaff']);
                }
            }

          } else {
            this.choose = 'Выберите тип';
            this.loginForm.setValue({error: 'Нет такого пользователя', userName: '', password: ''});
          }
        }
    );
  }
  ngOnInit() {
    const  temp = JSON.parse(localStorage.getItem('token'));
    // if (temp !== null) {
    //   if (new Date(temp['access_expire']).getTime() > Date.now()) {
    //     this.router.navigate(['/settings']);
    // }
    // }
}

Chooser() {
  if (this.choose === 'Собственник') {
    this.choose = 'owner';
    return true;
  } else if (this.choose === 'Сотрудник') {
    this.choose = 'staff';
    return true;
  } else {
    this.loginForm.patchValue({error: 'Выберите тип'});
  }
  if (this.choose !== 'Выберите тип') {

    return false;
  }
}





  selectOption(value: any) {
    if (value === 'Сотрудник') {
      this.choose = 'staff';
    } else if (value === 'Собственник') {
      this.choose = 'owner';
    } else { this.choose = undefined; }
  }
}
