import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../shared/class/helpers/Response";
import {SendAuth} from "../../../shared/class/auth/SendAuth";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServices} from '../auth.services';
import {Router} from '@angular/router';
import {DataServices} from '../../../shared/service/data.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AuthServices]
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  choose: string;
  error: any;
  constructor(private formBuilder: FormBuilder, private  authservice: AuthServices,
              private router: Router, private dataservies: DataServices) { }

  ngOnInit() {
    this.createRegisterForm();
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
  Register() {

      if (this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value) {
        this.registerForm.setValue({error: 'Пароли не совпадают', userName: '', password: ''});
      }
      this.authservice.registration(this.registerForm.get('userName').value, this.registerForm.get('password').value,
          this.choose).subscribe(
          (result: Answer) => {
            if (result.status.code === 201) {
              this.position('Регистрация прошла успешно');
              const user = result.responce as SendAuth;
              this.dataservies.SendAccount(user);

              if (user.role === 'owner') {
                this.router.navigate(['/settings/update']);
              } else {
                this.router.navigate(['/settings/updatestaff']);
              }

            } else {
              this.choose = 'Выберите тип';
              this.registerForm.setValue({error: result.status.message , userName: '', password: '', confirmPassword: '',
                term: false});
            }
          },
          error1 => console.log(error1)
      );

  }

  Choose(owner: string) {
    this.choose = owner;
  }
}
