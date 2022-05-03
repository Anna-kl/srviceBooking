import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent} from 'daypilot-pro-angular';
import {DataService} from './data1.services';
import {ActivatedRoute} from '@angular/router';
import {SheduleServices} from '../../../../shared/service/shedule.services';
import {DataServices} from '../../../../shared/service/data.services';
import {CookieService} from 'ngx-cookie-service';
import {Answer} from '../../../../shared/class/helpers/Response';
import {SendBusiness} from '../../../../shared/class/Shedule/SendBusiness';
import {Modal} from '@daypilot/modal';
import {ServicesServices} from '../../../../shared/service/services.services';
import {Service} from '../../../../shared/class/services/Service';
import {SendRecord} from '../../../../shared/class/services/SendServices';
import {DaysOf} from '../../../../shared/class/Shedule/DaysOf';
import {DayOfWeek} from '../../../../shared/class/Shedule/dateOfweek';
import {parse} from "querystring";
import {makeAfterCompile} from "ts-loader/dist/after-compile";



// const data = {
//   text: 'Event 1',
//   start: '2020-11-01',
//   end: '2020-11-02',
//   resource: 'B'
// };


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  providers: [DataService, SheduleServices, ServicesServices]
})
export class SchedulerComponent implements AfterViewInit {
  @ViewChild('calendar')
  calendar: DayPilotCalendarComponent;
  events: DayPilot.EventData[] = [];
  dttm: string;
  resources = [];
  Send: SendRecord;
  form = [];
  private user: any;
  private columns: SendBusiness[];
  private modalReference: any;
  private closeResult: string;
  config: DayPilot.CalendarConfig = {
  cellDuration: 15,
  viewType: 'Resources',
  headerLevels: 1,
  showCurrentTime: false,
  onTimeRangeSelected: args => {
  this.serservices.getServicesId(this.user.token, args.resource).subscribe(
        (result: Answer) => {
            if (result.status.code === 200){
                const temp = result.responce as Service[];
                this.resources = [];
                temp.map((s:Service)=>{
                    this.resources.push({name: s.name, id: s.id.toString()})
                });
                this.form.push(
                    {name: 'Начало', id: 'start', type: 'time' },
                    {name: 'Телефон клиента', id: 'client', type: 'text'},
                    {name: 'Выберите услугу', id: 'resource', options: this.resources},
                )
                const data = {
                      text: args.resource,
                      token: this.user.token,
                      start: new Date(args.start).toTimeString(),
                      resource: 'B',
                      send: this.Send
                    };
                this.scheduler.getDays(this.user.token, this.dttm, args.resource).subscribe(
                    (res: Answer) =>{
                        const daysof=res.responce as DayOfWeek;
                        let d=data.start.split(' ');
                        d=d[0].split(':');
                        const a = new Date(new Date(new Date(daysof.dttmStart).setHours(Number(d[0]))).setMinutes(Number(d[1])));

                        if (a < new Date(daysof.dttmStart)){
                            return;
                        }
                        const serv=this.scheduler;
                        DayPilot.Modal.form(this.form, data).then(function(modal){
                            //   const dp = this.calendar.control;
                            //   dp.clearSelection();
                            if (!modal.result) { return; }
                            modal.result.send = new SendRecord(parseInt(modal.result.resource,10),null,args.start,
                                0,args.client,null,daysof.id);
                            serv.AddRecordBis(modal.result.token, modal.result.send).subscribe(
                                (tempres:Answer) =>
                                {
                                    if (tempres.status.code === 201){
                                        location.reload();
                                    }
                                }
                            )
                            return;
                    }
                );
            });
        }});
      // DayPilot.Modal.prompt('Create a new event:', 'Event 1',).then(function(modal) {
      //   const dp = this.calendar.control;
      //   dp.clearSelection();
      //   if (!modal.result) { return; }
      //   dp.events.add(new DayPilot.Event({
      //     start: args.start,
      //     end: args.end,
      //     id: DayPilot.guid(),
      //     text: modal.result,
      //     resource: args.resource
      //   }));
      //   dp.onEventClicked(res =>{
      //     console.log();
      //   })
      // });
    },
    onEventClicked: args => {
      console.log();
    }

  };

  private SendData(){
      this.scheduler.AddRecordBis(this.user.token, this.Send);
  }
  constructor(private ds: DataService, private dataservices: DataServices,  private route: ActivatedRoute, private scheduler: SheduleServices,
              private cookieService: CookieService, private serservices: ServicesServices) {
    this.route.params.subscribe(params => {
      this.dttm = params.date;
      this.config.startDate=new DayPilot.Date(this.dttm);
      this.dataservices.users.subscribe(result => {
        if (result === undefined || result === null) {
          this.user = JSON.parse(this.cookieService.get('user'));
          this.dataservices.SendAccount(this.user);
        } else {
          this.user = result;
        }
      });
    });

  }
  ngAfterViewInit(): void {

    this.ds.getResources().subscribe(result => {
        this.config.columns = [];
        this.scheduler.getBusiness(this.user.token, this.dttm).subscribe(
            (resultsc: Answer) => {
                if (resultsc.status.code === 200) {
                    let data = resultsc.responce as SendBusiness[];
                    //    data.push({
                    //
                    // });

                    for (const a of data) {
                        if (!this.config.columns.find(x => x.id === a.account_id.toString())) {
                            this.config.columns.push({name: a.resource.toString(), id: a.account_id.toString()})

                        }
                        a.start = new DayPilot.Date(a.start.toString());
                        a.resource = a.account_id.toString();
                        a.end = new DayPilot.Date(a.end.toString());
                    }
                    let res_s = [];
                    data.map(s => {
                        if (!res_s.find(x => x === s['resource']))
                            res_s.push(s['resource']);
                    })
                    for (let a of res_s) {
                        this.scheduler.getDays(this.user.token, this.dttm, a).subscribe(
                            (res: Answer) => {
                                const daysof = res.responce as DayOfWeek;
                                data.push({
                                    account_id: 0,
                                    html: '',
                                    id: -1, services_name: '', start: new DayPilot.Date('2021-05-05T00:00:00'),
                                    end: new DayPilot.Date(daysof.dttmStart), resource: a,
                                    backColor: '#cccccc'
                                });
                                data.push({
                                    account_id: 0,
                                    html: '',
                                    id: -1, services_name: '', start: new DayPilot.Date(daysof.dttmEnd),
                                    end: new DayPilot.Date('2021-05-05T23:59:00'), resource: a,
                                    backColor: '#cccccc'
                                });
                            });
                    }
                    // this.config.columns.pop();
                    const from = this.calendar.control.visibleStart();
                    const to = this.calendar.control.visibleEnd();
                    this.ds.getEvents(from, to).subscribe(resulttemp => {
                        data = data.filter(x => x.id !== 0);
                        this.events = data as unknown as DayPilot.EventData[];

                    });
                }
            });
    });
    }


  private getDismissReason(reason) {

  }
}
