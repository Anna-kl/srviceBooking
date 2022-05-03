import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServices} from '../auth.services';
import {Router} from '@angular/router';
import {Answer} from '../../../shared/class/helpers/Response';
import Swal from 'sweetalert2';
import {Token} from '../../../shared/class/auth/Token';
import {DataServices} from '../../../shared/service/data.services';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {CookieService} from 'ngx-cookie-service';
import {Md5} from 'ts-md5/dist/md5';


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
  public flagSms = false;
  public errorText = '';
  public role: string;
  public errorTimeFlag = false;
  public errorCode = false;
  private timeLeft = 60;
  private interval: number;

  constructor(private formBuilder: FormBuilder, private  authservice: AuthServices,
              private router: Router, private dataservies: DataServices,
              private cookieService: CookieService) {
    this.createLoginForm();

  }

  owlcarousel = [
    {
      title: 'Добро пожаловать',
      desc: 'Представляем вашему внимаю оптовую базу',
    },
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
      const data = this.loginForm.getRawValue();
      const md5 = new Md5();
      const id = md5.appendStr('hello').end().toString().substring(20);
      // if (this.role === undefined){
      //   this.errorCode = true;
      //   this.errorText = 'Выберите категорию слева';
      // } else {
        this.authservice.checkCode(data.userName.replace('+', '')
            .replace('(', '').replace(')', ''), data.password, id, this.role).subscribe(
            (result: Answer) => {
              if (result.status.code === 200) {
                this.cookieService.set('ocpio-cookie', id);
                const user = result.responce as SendAuth;
                this.dataservies.SendAccount(user);
                if (user.role === 'owner') {
                  if (user.isfilled){
                    this.router.navigate(['/settings/profile']);
                  } else {
                    this.router.navigate(['/settings/update']);
                  }
                } else {
                  this.router.navigate(['/settings/updatestaff']);
                }
              } else {
                this.errorCode = true;
                this.errorText = 'Код введен неверно';
                this.errorTimeFlag = false;
              }
            }
        );
   //   }
    // this.authservice.getAuth(this.loginForm.get('userName').value, this.loginForm.get('password').value, this.choose).subscribe(
    //     (result: Answer) => {
    //       if (result.status.code === 200) {
    //         const user = result.responce as SendAuth;
    //         this.authservice.setCookie(JSON.stringify(user));
    //         this.dataservies.SendAccount(user);
    //         if (user.isfilled) {
    //           if (user.role === 'owner') {
    //           this.router.navigate(['/dashboard/default']);
    //           } else {
    //             this.router.navigate(['/settings/profilestaff']);
    //           }
    //         } else {
    //             if (user.role === 'owner') {
    //           this.router.navigate(['/settings/update']);
    //             } else {
    //                 this.router.navigate(['/settings/updatestaff']);
    //             }
    //         }
    //
    //       } else {
    //         this.choose = 'Выберите тип';
    //         this.loginForm.setValue({error: 'Нет такого пользователя', userName: '', password: ''});
    //       }
    //     }
    // );
  }

  ngOnInit() {
    const cookie = this.cookieService.get('ocpio-cookie');
    if (cookie){
      this.authservice.checkCookie(cookie).subscribe(
            (result: Answer) => {
              if (result.status.code === 200){
                const user = result.responce as SendAuth;
                this.dataservies.SendAccount(user);
                if (user.role === 'owner') {
                  this.router.navigate(['/settings/update']);
                } else {
                  this.router.navigate(['/settings/updatestaff']);
                }
              }
          }
      );
    } else {
      this.loginForm.get('userName').valueChanges.subscribe(x => {
        let phone = this.loginForm.get('userName').value;
        if (phone.length === 1) {
          if (phone !== '+' && phone !== '7' && phone !== '8') {
            phone = '+7(' + phone;
          } else {
            phone = '+7(';
          }
          this.loginForm.patchValue({userName: phone});
        } else if (phone.length === 6) {
          phone = phone + ')';
          this.loginForm.patchValue({userName: phone});
        } else if (phone.length > 13) {
          this.flagSms = true;
          phone = phone.replace('(', '').replace(')', '').replace('+', '');
          this.authservice.sendPhone(phone).subscribe(
              (result: Answer) => {
                if (result.status.code === 200) {
                  this.startTimer();
                  this.flagSms = true;
                  this.errorTimeFlag = true;
                } else {
                  this.errorText = 'Невозможно авторизоваться';
                }
              }
          );
        }
      });
    }
    // if (temp !== null) {
    //   if (new Date(temp['access_expire']).getTime() > Date.now()) {
    //     this.router.navigate(['/settings']);
    // }
    // }
}

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft <= 60 && this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.timeLeft === 0){
          this.errorTimeFlag = false;
          clearInterval(this.interval);
        }
      }
    }, 1000);
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

  ChangeRole(staff: string) {
    this.role = staff;
  }
}
