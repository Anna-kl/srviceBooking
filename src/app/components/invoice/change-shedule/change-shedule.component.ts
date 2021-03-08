import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SheduleServices} from '../../../shared/service/shedule.services';
import {DataServices} from '../../../shared/service/data.services';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {Answer} from '../../../shared/class/helpers/Response';
import {ConcreteDay,  SendAllInfo, SendConcrete} from '../../../shared/class/Shedule/concreteDay';
import {DaysOf} from '../../../shared/class/Shedule/DaysOf';
import {DescDay} from '../../../shared/class/Shedule/descDay';

@Component({
  selector: 'app-change-shedule',
  templateUrl: './change-shedule.component.html',
  styleUrls: ['./change-shedule.component.scss'],
  providers: [SheduleServices]
})
export class ChangeSheduleComponent implements OnInit {
  private name: any;
  private user: SendAuth;
  private days: SendConcrete;
  work: any[];
  main: any[];
    private Subcapital: any[];
    isdesc = true;
    private DescCard: SendAllInfo;

  constructor(private route: ActivatedRoute, private shedule: SheduleServices, private dataservices: DataServices) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params.id;
      this.dataservices.users.subscribe(result => {
        this.user = result;
        this.shedule.getconcreteDay(this.user.token, this.name).subscribe(
          (result1: Answer) => {
            this.days = result1.responce as SendConcrete;
            console.log(this.days);
            this.work = [];
            let start = new Date(this.days.start);
            for (const temp of this.days.send) {
                let end = new Date(temp.start);
                const t = new Date(start).getTime() - new Date(temp.start).getTime();
                let d = []
                while (start !== end) {
    d.push(start);
    пшеstart = new Date(start.getTime() + (15 * 60 * 1000));
}

                this.work.push({start, end: temp.start, service: null, flag: false});
                start = new Date(temp.start);
                end = new Date(temp.end);
                while (start !== end){
                    d.push(start);
                    start = new Date(start.getTime() + 15 * 60);
                }

                this.work.push({start, end: temp.end, service: temp.nameservices, flag: true});
            }
//             this.days.concrete.map(res => {
//                 res.dttm_start = new Date(res.dttm_start);
//                 res.dttm_end = new Date(res.dttm_end);
//             });
//             this.days.concrete.sort((val1, val2) => {
//                 return (val1.dttm_start.getTime() - val2.dttm_start.getTime());
//             });
//             const len = (new Date(this.days.day.dttmEnd).getTime() - new Date(this.days.day.dttmStart).getTime()) / (1000 * 60 * 15);
//             this.work = [];
//             let start = new Date(this.days.day.dttmStart);
//             this.Subcapital = [];
//             while (start <= new Date(this.days.day.dttmEnd)) {
//               this.Subcapital.push(start);
//               start = new Date(start.getTime() + (15 * 60 * 1000));
//             }
//             let temp =[];
//             for (const a of this.days.concrete) {
//                     let tr = [];
//                     for (const b of this.Subcapital){
//                         if (a.dttm_start <= b && a.dttm_end >= b) {
//                             const c = new DescDay('green', a);
//                             tr.push(c);
//                         } else {
//                             const c = new DescDay('yellow', a);
//                             tr.push(a);
//                         }
//                     }
//                     temp.push(tr);
//             }
//               let index = 0;
//             for (const t1 of this.Subcapital){
//                 let tt = [];
//                 let i = 0;
//                 tt.push(t1);
//                 for (const t of this.days.concrete){
// tt.push(temp[i][index]);
// i++;
// }
//                 this.work.push(tt);
//                 index++;
//             }
          });
          }
      );
    });
  }

    ShowDesc(a: DescDay) {
        this.isdesc = false;
        this.shedule.getallInformation(this.user.token, a.day.id).subscribe(
            (result: Answer) => {
                if (result.status.code === 200) {
this.DescCard = result.responce as SendAllInfo;
                }

            }
        );
     //   this.DescCard = a.day;
    }
}
