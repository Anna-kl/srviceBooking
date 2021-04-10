import { Component, OnInit } from '@angular/core';
import { invoiceDB } from '../../shared/tables/invoice';
import {SheduleServices} from '../../shared/service/shedule.services';
import {DataServices} from '../../shared/service/data.services';
import {SendAuth} from '../../shared/class/auth/SendAuth';
import {Answer} from '../../shared/class/helpers/Response';
import {DayOfWeek} from '../../shared/class/Shedule/dateOfweek';
import {Days} from '../../shared/class/Shedule/days';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../shared/class/category/Category';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [SheduleServices]
})
export class InvoiceComponent implements OnInit {
  private modalReference: NgbModalRef;
  constructor(private sheduleservices: SheduleServices, private dataservices: DataServices,
              private modalService: NgbModal, private formBuilder: FormBuilder, private Route: Router, private cookieService: CookieService ) {
    this.dataservices.users.subscribe(result => {
      if (result===undefined || result === null){
        this.user=JSON.parse(this.cookieService.get('user'));
        this.dataservices.SendAccount(this.user);
      } else {
        this.user = result;
      }

      this.sheduleservices.getDaysOfWeek(this.user.token, ((new Date()).getMonth() + 1).toString(),
          (new Date()).getFullYear().toString()).subscribe(
          (result1: Answer) => {
            if (result1.status.code === 200) {
              this.dateOf = result1.responce as DayOfWeek[];
            //  const aa = new Date(this.dateOf[0].dttmEnd);
              const today = new Date();
              const sDay = new Date(today.setDate(1));
              let start = today.getDay();
              if (start === 0) {
                start = 7;
              }
              const tendaysago = new Date(new Date().setDate(today.getDate() - start));
              this.maindays = [];
              for (const a of [1, 2, 3, 4, 5]) {
                const numbers = Array(7).fill(1).map((x, i) => {
                  const d = new Date(tendaysago.setDate(tendaysago.getDate() + 1));
                  let ss: Days = null;
                  const s1 = this.dateOf.find(x1 => new Date(x1.dttmStart).getDate() === d.getDate())
                  if (s1 !== undefined) {
                      ss = new Days(d, 'green', s1.id);
                  } else {
                    ss = new Days(d, 'wheat', 0);
                  }
                  return ss;

                });
                this.maindays.push(numbers);
              }
            }
          }
      );
    });
    this.shedule = [1, 2, 3, 4];
    this.week = [1, 2, 3, 4, 5, 6, 7];
    this.invoice = invoiceDB.data;
  }
UpdateDate(){
  this.sheduleservices.getDaysOfWeek(this.user.token, ((new Date()).getMonth() + 1).toString(),
      (new Date()).getFullYear().toString()).subscribe(
      (result1: Answer) => {
        if (result1.status.code === 200) {
          this.dateOf = result1.responce as DayOfWeek[];
          //  const aa = new Date(this.dateOf[0].dttmEnd);
          const today = new Date();
          const sDay = new Date(today.setDate(1));
          let start = today.getDay();
          if (start === 0) {
            start = 7;
          }
          const tendaysago = new Date(new Date().setDate(today.getDate() - start));
          this.maindays = [];
          for (const a of [1, 2, 3, 4, 5]) {
            const numbers = Array(7).fill(1).map((x, i) => {
              const d = new Date(tendaysago.setDate(tendaysago.getDate() + 1));
              let ss: Days = null;
              for (const t1 of this.dateOf) {
                if (new Date(t1.dttmStart).getDate() !== d.getDate() &&
                    new Date(t1.dttmEnd).getDate() !== d.getDate()) {
                  ss = new Days(d, 'wheat', t1.id);
                } else {
                  ss = new Days(d, 'green', t1.id);
                }
              }
              return ss;
            });
            this.maindays.push(numbers);
          }
        }
      }
  );
}
  public invoice = [];
  private shedule: number[];
  private week: number[];
  maindays: any;
  private user: SendAuth;
  private dateOf: DayOfWeek[];
  header: string;
  addDay: boolean;
  picker1: any;
  TimeControl: FormGroup;
  private closeResult: string;
public Days = {
   Days:  [
     {day: 1,
     name: 'Mon'},
     {day: 2,
  name: 'Tue'},
     {day: 3,
       name: 'Wen'},
     {day: 4,
       name: 'Tue'},
     {day: 5,
       name: 'Fri'},
     {day: 6,
       name: 'Sat'},
     {day: 3,
       name: 'Sun'},
        ]
};
  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      no: {
        title: 'No'
      },
      invoice: {
        title: 'Invoice'
      },
      date: {
        title: 'Date'
      },
      shipping: {
        title: 'Shipping'
      },
      amount: {
        title: 'Amount'
      },
      tax: {
        title: 'Tax'
      },
      total: {
        title: 'Total'
      }
    },
  };

  open(content, b: any) {
    if (b.color === 'wheat') {
      this.header = 'Добавить день';
      this.addDay = true;
      this.TimeControl = this.formBuilder.group({
        days: b.date,
        start: ['', Validators.required],
        end: ['', Validators.required]
      });
      this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      this.modalReference.result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
      );
    } else {
      this.Route.navigate(['invoice/change/' + b.id]);
    }

  }

  ngOnInit() {

  }

  CheckDay(b: any) {

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  AddDays() {

    const data = this.TimeControl.getRawValue();
    const start = new Date(data.days);
    let a2 = parseInt(data.start.split(':')[0], 10);
    start.setHours(a2);
    a2 = parseInt(data.start.split(':')[1], 10);
    start.setMinutes(a2);
    start.setSeconds(0);
    const end = new Date(data.days);
    a2 = parseInt(data.end.split(':')[0], 10);
    end.setHours(a2);
    a2 = parseInt(data.end.split(':')[1], 10);
    end.setMinutes(a2);
    end.setSeconds(0);
    const days = new DayOfWeek(0, start, end, 0);
    this.sheduleservices.addDaysofWork(this.user.token,  days).subscribe(
         (result: Answer)  => {
           if (result.status.code === 201) {
             this.position('День добавлен');
             this.modalReference.close();
             this.UpdateDate();
           }
         }, error1 => console.log(error1)
     );
  }
}
