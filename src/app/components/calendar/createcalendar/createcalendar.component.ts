

import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SheduleServices} from "../../../shared/service/shedule.services";
import {DataService} from "angular2-multiselect-dropdown/lib/multiselect.service";
import {DataServices} from "../../../shared/service/data.services";
import {CookieService} from "ngx-cookie-service";
import {SendAuth} from "../../../shared/class/auth/SendAuth";
import {Answer} from "../../../shared/class/helpers/Response";
import {DayOfWeek} from "../../../shared/class/Shedule/dateOfweek";
import {SendCalendar, StaffData} from "../../../shared/class/Shedule/SendCalendar";
import {StaffServices} from "../../../shared/service/staff.services";
import {DomSanitizer} from "@angular/platform-browser";
import {EmployeeOwner} from "../../../shared/class/staff/EmployeeOwner";
import {ClientServices} from "../../../shared/service/client.services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {DaysOf} from "../../../shared/class/Shedule/DaysOf";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-createcalendar',
  templateUrl: './createcalendar.component.html',
  styleUrls: ['./createcalendar.component.scss'],
    providers: [SheduleServices, StaffServices, ClientServices]
})


export class CreatecalendarComponent implements OnInit {
  @Input() events: any;
  @Input() prevButtonText = 'previous';
  @Input() nextButtonText = 'next';
  @Input() daysShort = ['Пон', 'Втор', 'Среда', 'Четв', 'Пятн', 'Субб', 'Воск'];
  iconPath = 'assets/images/';
  @Input() iconFormat = '.png';
  iconSortArray = [];
  eventDates = [];
  cells = [];
  MONTHS = ['Январь',  'Февраль',  'Март',  'Апрель',  'Май',  'Июнь',  'Июль'];
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  visibleMonth: string;
  prevMonth: string;
  nextMonth: string;
  visibleYear: string;
 corner: any[];
  prevYear: number;
  Category: EmployeeOwner[];
  nextYear: number;
  staffdata: any;
  months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ];
    private user: SendAuth;
  private dateOf: SendCalendar[];
  nextmonth: any;
  prevmonth: any;
  addDay = true;
  TimeControl: any;
  category: any;
  private modalReference: any;
  private closeResult: string;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private schedule: SheduleServices, private dataservices: DataServices,
              private cookieService: CookieService,private sheduleservices: SheduleServices,  private router: Router,
              private staff: StaffServices,  private modalService: NgbModal, private sanitizer: DomSanitizer, private clientser: ClientServices) {
  }

  ngOnInit(): void {
    this.corner = ['left-top', 'rigth-top'];
    this.events = [];
      this.dataservices.users.subscribe(result => {
        if (result === undefined || result === null) {
          this.user = JSON.parse(this.cookieService.get('user'));
          this.dataservices.SendAccount(this.user);
        } else {
          this.user = result;
        }
       this.LoadCalendar(((new Date()).getMonth() + 1).toString(),(new Date()).getFullYear().toString());
        this.nextmonth = this.MONTHS[(new Date()).getMonth() + 1];
        this.prevmonth = this.MONTHS[(new Date()).getMonth() - 1];
        this.visibleMonth = this.MONTHS[(new Date()).getMonth()]
        console.log(this.nextMonth);
  });
  }
LoadCalendar(month: string, year: string){
  this.schedule.getDaysOfWeek(this.user.token, month,
    year).subscribe(
      (result1: Answer) => {
        if (result1.status.code === 200) {
          this.dateOf = result1.responce as SendCalendar[];
          for(const t of this.dateOf){
            this.staff.getUserpic(this.user.token, t.id_staff).subscribe(
                avatar=>{
                  const unsafeImageUrl = URL.createObjectURL(avatar);
                  t.avatar = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
                  const listaa = this.cells.filter(x=>x.corner.find(y=>y === t.id_staff));
                  for (let b of listaa) {
                    b.icon.push('url(\'' + unsafeImageUrl + '\')');
                  }
                }
            );
          }
          this.drawCalendar(this.currentMonth, this.currentYear);
        }
      }
  );
  //  this.events = {'2021-04-02': {icon: 'edit'}, '2021-04-10': {icon: 'edit'}};

}

  openDialog(cell) {
    this.dialog.open(MultipleIconsDialogComponent, {
      data: {
        iconList: this.events[cell.date].icon.split('-'),
        iconPath: this.iconPath,
        iconFormat: this.iconFormat
      }
    });
  }

  isObjEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  next() {
    this.currentYear =
        this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.nextmonth=this.MONTHS[this.currentMonth+1];
    this.prevmonth = this.MONTHS[this.currentMonth-1]
    this.visibleMonth = this.MONTHS[this.currentMonth];
    const month = (this.currentMonth+1).toString().length === 1? '0'+ (this.currentMonth+1).toString(): (this.currentMonth+1).toString();
    this.LoadCalendar(month, this.currentYear.toString());
  }

  previous() {
    this.currentYear =
        this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    this.nextmonth=this.MONTHS[this.currentMonth+1];
    this.prevmonth = this.MONTHS[this.currentMonth-1]
    this.visibleMonth = this.MONTHS[this.currentMonth];
    const month = (this.currentMonth+1).toString().length === 1? '0'+ (this.currentMonth+1).toString(): (this.currentMonth+1).toString();
    this.LoadCalendar(month, this.currentYear.toString());
    //this.drawCalendar(this.currentMonth, this.currentYear);
  }

  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  drawCalendar(month, year) {
    let firstDay = new Date(year, month).getDay() + 6;
    // Shifting firstday to match Monday
    if (firstDay > 6) {
      firstDay = firstDay % 7;
    }
    // clearing all previous cells
    this.cells = [];
    // filing data about month and year in the page via DOM.
  //  this.visibleMonth = this.months[month];
    this.prevMonth =
        this.months[month - 1] || this.months[this.months.length - 1];
    this.nextMonth = this.months[month + 1] || this.months[0];
    this.visibleYear = year;
    this.prevYear = year;
    this.nextYear = year;
    if (month === 0) {
      this.prevYear = year - 1;
    } else if (month === 11) {
      this.nextYear = year + 1;
    }
    // creating all cells
    let date = 1;

    for (let i = 0; i < 6; i++) {
      // creating individual cells, filling them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          this.cells.push({
            dayNumber: '',
            dayClass: '',
            cellClass: '',
            corner: [],
            icon: []
          });
        } else if (date > this.daysInMonth(month, year)) {
          break;
        } else {
          const cellYear = year;
          let cellMonth = (month + 1).toString();
          if (cellMonth.length === 1) {
            cellMonth = '0' + cellMonth;
          }
          let cellDay = date.toString();
          if (cellDay.length === 1) {
            cellDay = '0' + cellDay;
          }
          const cellDate = cellYear + '-' + cellMonth + '-' + cellDay;

          let styleList = {};
          let cellClass = '';

          let icon = [];
          let corner = [];
          const dayClass = '';
          this.staffdata = new StaffData(null, null);
          if (this.dateOf.find(x=>x.days.find(y=>y===cellDate))) {
            cellClass = undefined;
         //   color='green'
            this.staffdata = this.dateOf.filter(x=>x.days.find(y=>y===cellDate))
            for (const  temp of this.staffdata) {
              corner.push(temp.id_staff);
            }
          }
          else {
            this.staffdata.avatar=undefined;
          }
          if (this.staffdata.avatar) {
            corner = this.corner.pop();
            icon = this.staffdata.avatar;
            const iconNames = this.events[cellDate].icon.split('-');
            // for (const item of iconNames) {
            switch (iconNames.length) {
              case 1:
                styleList = {
                  center: iconNames[0],
                  topLeft: 'blank',
                  topRight: 'blank',
                  bottomLeft: 'blank',
                  bottomRight: 'blank'
                };
                break;
              case 2:
                styleList = {
                  center: 'blank',
                  topLeft: iconNames[0],
                  topRight: 'blank',
                  bottomLeft: 'blank',
                  bottomRight: iconNames[1]
                };
                break;
              case 3:
                styleList = {
                  center: 'blank',
                  topLeft: iconNames[0],
                  topRight: iconNames[1],
                  bottomLeft: 'blank',
                  bottomRight: iconNames[2]
                };
                break;
              case 4:
                styleList = {
                  center: 'blank',
                  topLeft: iconNames[0],
                  topRight: iconNames[1],
                  bottomLeft: iconNames[2],
                  bottomRight: iconNames[3]
                };
                break;
              default:
                break;
            }
            if (iconNames.length > 4) {
              styleList = {
                showDialogButton: true,
                center: 'blank',
                topLeft: 'blank',
                topRight: 'blank',
                bottomLeft: 'blank',
                bottomRight: 'blank'
              };
            }
            // }
          }

          if (this.isObjEmpty(styleList)) {
            styleList = {
              center: 'blank',
              topLeft: 'blank',
              topRight: 'blank',
              bottomLeft: 'blank',
              bottomRight: 'blank'
            };
          }

          this.cells.push({
            date: cellDate,
            dayNumber: date.toString(),
            dayClass,
            cellClass,
            styles: styleList,
            corner,
            icon
          });
          // color today's date
          if (
              date === this.today.getDate() &&
              year === this.today.getFullYear() &&
              month === this.today.getMonth()
          ) {
            this.cells[this.cells.length - 1].dayClass = 'today accent-bg';
          }
          date++;
        }
      }
    }
  }

  TestClick(content, cell: any) {
  //  this.router.navigate(['/calendar/scheduler/']);
    this.TimeControl=this.formBuilder.group({
      start: '',
      end: '',
      category: null,
      days: cell.date,
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
   this.clientser.getStaffs(this.user.token, new Date(cell.date)).subscribe(
       (result: Answer) => {
         if (result.status.code === 200){
           this.Category = result.responce as EmployeeOwner[];
           if (this.Category.length>0)
           this.TimeControl.patchValue({category: this.Category[0]});
         }
       }
   )
  }

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
    const days = new DayOfWeek(0, start, end, data.category.id);
    this.sheduleservices.addDaysofWork(this.user.token,  days).subscribe(
        (result: Answer)  => {
          if (result.status.code === 201) {
            this.position('День добавлен');
            this.modalReference.close();
           // this.UpdateDate();
          }
        }, error1 => console.log(error1)
    );
console.log();
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
  changeCategory($event: Event) {
console.log();
  }

  private getDismissReason(reason) {
    
  }

  GoOver() {
    const data = this.TimeControl.getRawValue();
    this.modalReference.close();
    this.router.navigate(['calendar/scheduler/'+data.days]);
  }
}

@Component({
  selector: 'app-multiple-icons-dialog',
  templateUrl: 'multiple-icons-dialog.html',
  styleUrls: ['./createcalendar.component.scss']
})
export class MultipleIconsDialogComponent {
  iconList: any;
  iconPath: string;
  iconFormat: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.iconList = data.iconList;
    this.iconPath = data.iconPath;
    this.iconFormat = data.iconFormat;
  }
}
