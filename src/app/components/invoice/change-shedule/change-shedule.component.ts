import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SheduleServices} from '../../../shared/service/shedule.services';
import {DataServices} from '../../../shared/service/data.services';
import {SendAuth} from '../../../shared/class/auth/SendAuth';
import {Answer} from '../../../shared/class/helpers/Response';

import {ConcreteDay,  SendAllInfo, SendConcrete} from '../../../shared/class/Shedule/concreteDay';
import {DaysOf} from '../../../shared/class/Shedule/DaysOf';
import {DescDay} from '../../../shared/class/Shedule/descDay';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {FormBuilder, Validators} from '@angular/forms';
import {ServicesServices} from '../../../shared/service/services.services';
import {Category} from '../../../shared/class/category/Category';
import {Service} from '../../../shared/class/services/Service';
import {ClientServices} from '../../../shared/service/client.services';
import { Client } from 'src/app/shared/class/client/Client';
import {ProvidersEvaluator} from '@angular/core/schematics/migrations/missing-injectable/providers_evaluator';
import {SendServices} from '../../../shared/class/services/SendServices';
@Component({
  selector: 'app-change-shedule',
  templateUrl: './change-shedule.component.html',
  styleUrls: ['./change-shedule.component.scss'],
  providers: [SheduleServices, ServicesServices, ClientServices]
})
export class ChangeSheduleComponent implements OnInit {
  private name: any;
  private user: SendAuth;
  private days: SendConcrete;
  work: any[]=[];
  main: any[]=[];
    private Subcapital: any[];
    isdesc = true;
    modalReference: any;
    public closeResult: string;
    modalReference1: any;
    DescCard: SendAllInfo;
    error: string;
    Category: Service[];
    category: Service;
    ServiceControl: any;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    getclients: Client;
flaguser = false;
    errortime: any;
    constructor(private route: ActivatedRoute, private shedule: SheduleServices, private dataservices: DataServices,
              private modalService: NgbModal, private formbuilder: FormBuilder, private servic: ServicesServices, private clientservice: ClientServices) { }

  ngOnInit() {
      this.dropdownSettings = {
          singleSelection: true,
          idField: 'id_item',
          textField: 'item_text',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 5,
          allowSearchFilter: true
      };
    this.route.params.subscribe(params => {
      this.name = params.id;
      this.dataservices.users.subscribe(result => {
        this.user = result;
        this.RefreshData();
          }
      );
    });
      this.ServiceControl = this.formbuilder.group({
          start: ['', Validators.required],
       //   category: ['Выберите категорию', Validators.required],
          client: ['', Validators.required],
          nameclient: '',
          end: '',
          dttm: ['', Validators.required],
          servicescomment: ''

      });
  }
RefreshData() {
    this.shedule.getconcreteDay(this.user.token, this.name).subscribe(
        (result1: Answer) => {
            this.days = result1.responce as SendConcrete;
           // console.log(this.days);
            this.work = [];
            let start = new Date(this.days.start);
            for (const temp of this.days.send) {
                let end = new Date(temp['start_dttm']);
                const t = new Date(start).getTime() - new Date(temp['start_dttm']).getTime();
                let d = [];
                while (start <= end) {
                    d.push(start);
                    start = new Date(start.getTime() + (15 * 60 * 1000));
                }

                this.work.push({start, end: temp['start_dttm'], service: null, flag: false, td: d, color: 'white', price: undefined, client: null, comment: null});
                start = new Date(temp['start_dttm']);
                end = new Date(temp['end_dttm']);
                d = [];
                start = new Date(start.getTime() + (15 * 60 * 1000));

                while (start <= end) {
                    d.push(start);
                    start = new Date(start.getTime() + 15 * 60 * 1000);
                }

                this.work.push({start, end: temp['end_dttm'], service: temp['services_name'], flag: true, td: d, color: 'green', price: temp.price,
                    client: temp['name_client'], comment: temp['comment_client'], id : temp.id});
            }
            const d = [];
            const end = new Date(this.days.end);
            while (start <= end) {
                d.push(start);
                start = new Date(start.getTime() + 15 * 60 * 1000);
            }

            this.work.push({start, end, service: null, flag: false, td: d, color: 'white', price: undefined, client: null, comment: null});
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

    Edit(b: any, content: TemplateRef<any>) {
        this.modalReference1 = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.shedule.getallInformation(this.user.token, b.id).subscribe(
            (result: Answer) => {
                if (result.status.code === 200) {
                    this.DescCard = result.responce as SendAllInfo;
                }

            }
        );
    }
    // open(content) {
    //
    // }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    AddComment() {
this.shedule.AddComment(this.user.token, this.DescCard.id, this.DescCard.comment_service).subscribe(
    (result: Answer) => {
        if (result.status.code === 200) {
            this.position('Комментарий добавлен');
            this.modalReference1.close();
        }
    }
);
    }

    Cancel() {

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
    CancelService(content1: TemplateRef<any>) {
        this.modalReference = this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }

    Ok() {
        this.shedule.CancelService(this.user.token, this.DescCard.id).subscribe(
            (result: Answer) => {
                if (result.status.code === 200) {
                    this.position('Заказ отменен');
                    this.RefreshData();
                    this.modalReference.close();
                    this.modalReference1.close();
                }
            }
        );
    }

    AddRecord() {
const data = this.ServiceControl.getRawValue();
const services=this.Category.find(x=>x.id===this.selectedItems['id_item']);
let start=new Date(data.start);
        const tt=data.dttm.split(':');
        start=new Date(new Date(data.start.setHours(tt[0])).setMinutes(tt[1]));
const end = new Date(start.getTime()+60*1000*services.minutes);
if (start>=data.start&&end<=data.end){
    this.noposition('Не правильно выбрано время');
    this.ServiceControl.patchValue({dttm: undefined});
}else{
    const send = new SendServices(this.selectedItems['id_item'], data['nameclient'], start, this.getclients.id, data['phone'], data['servicescomment']);
}
console.log(data);
    }

    changeCategory($event: Event) {

    }

    CreateRecord(td: any, content2: TemplateRef<any>) {
        this.error = '';
        this.errortime='';
        this.flaguser=false;
        this.servic.getServices(this.user.token).subscribe(
            (result: Answer) => {
                this.Category = [];
             //   this.Category.push(new Service(null, null, -1, 'Выберите категорию', -1, -1));
                this.Category.push(...result.responce as Service[]);

                this.category = this.Category[0];
                this.dropdownList = [];
                this.Category.map(a=>{
                    this.dropdownList.push({id_item: a.id, item_text:a.name})
                });
                // this.dropdownList = [
                //     { item_id: 1, item_text: 'Mumbai' },
                //     { item_id: 2, item_text: 'Bangaluru' },
                //     { item_id: 3, item_text: 'Pune' },
                //     { item_id: 4, item_text: 'Navsari' },
                //     { item_id: 5, item_text: 'New Delhi' }
                // ];

                this.ServiceControl.setValue({
                 //   category: '',
                    start: new Date(td[0]),
                    dttm: new Date(),
                    client: '',
                    nameclient: '',
                    end: new Date(td[td.length-1]),
                    servicescomment: ''
                });
            }
        );
        this.modalReference = this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });



    }

    GetClient() {
        this.clientservice.getPhotos(this.user.token,this.ServiceControl.get('client').value).subscribe(
            (result: Answer) => {
                if (result.status.code===200){
                    this.getclients = result.responce as Client;
                    this.ServiceControl.patchValue({nameclient: this.getclients.name});
                    this.flaguser=true;
                }
             //   this.ServiceControl.patchValue({nameclient: 'Введите имя пользователя'})
                this.error = 'Клиент не найден';
            }
        )
    }

    onItemSelect($event: any) {
        this.selectedItems=$event;
    }

    onSelectAll($event: any) {

    }

    CheckTime() {
        const data=this.ServiceControl.getRawValue();
        const start=new Date(data.start);
        const tt=data.dttm.split(':');
        const test=new Date(new Date(data.start.setHours(tt[0])).setMinutes(tt[1]));

        if (test< start || test>data.end){
            this.errortime = 'Выберите интервал между '+data.start.toLocaleTimeString()+ ' и '+data.end.toTimeString();
        }
        console.log();
    }
}
