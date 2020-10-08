import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServices} from '../auth.services';
import {Router} from '@angular/router';
import {Answer} from '../../../shared/class/helpers/Response';
import Swal from 'sweetalert2';
import {Token} from '../../../shared/class/auth/Token';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthServices]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public tokens: Token;
  public auth = false;


  constructor(private formBuilder: FormBuilder, private  authservice: AuthServices,
              private router: Router) {
    this.createLoginForm();
    this.createRegisterForm();
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
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: new FormControl(''),
      password: new FormControl('', Validators.minLength(8)),
      confirmPassword: '',
      error: '',
      term: new FormControl(false, Validators.requiredTrue)
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
  if (this.Chooser()) {
    this.authservice.getAuth(this.loginForm.get('userName').value, this.loginForm.get('password').value, this.choose).subscribe(
        (result: Answer) => {
          if (result.status.code === 201) {
            this.tokens = result.responce as Token;
            // localStorage.setItem('token', JSON.stringify(this.tokens));
            //
            this.router.navigate(['/settings/profile']);

          } else {
            this.choose = 'Выберите тип';
            this.loginForm.setValue({error: 'Нет такого пользователя', userName: '', password: ''});
          }
        }
    ); } else {
    this.loginForm.patchValue({error: 'Выберите тип'});
  }
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
    this.choose = 'job';
    return true;
  } else {
    this.loginForm.patchValue({error: 'Выберите тип'});
  }
  if (this.choose !== 'Выберите тип') {

    return false;
  }
}
  Register() {
    if (this.Chooser()) {
      if (this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value) {
this.registerForm.setValue({error: 'Пароли не совпадают', userName: '', password: ''});
    }
      this.authservice.registration(this.registerForm.get('userName').value, this.registerForm.get('password').value,
        this.choose).subscribe(
        (result: Answer) => {
          if (result.status.code === 201) {
            this.position('Регистрация прошла успешно');
            // l JSON.parse(result['message']);
            // localStorage.setItem('token', JSON.stringify(this.tokens));

            this.router.navigate(['/users/create-user']);

          } else {
            this.choose = 'Выберите тип';
            this.registerForm.setValue({error: result.status.message , userName: '', password: '', confirmPassword: '',
            term: false});
          }
        }
    );
  } else {
      this.registerForm.patchValue({error: 'Выберите тип'});
    }
  }




  selectOption(value: any) {
    if (value === 'Сотрудник') {
      this.choose = 'job';
    } else if (value === 'Собственник') {
      this.choose = 'owner';
    } else { this.choose = undefined; }
  }
}
