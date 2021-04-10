import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {SendAcount} from '../class/account/SendAcount';
import {environment} from '../../../environments/environment.prod';
import {SendServices} from '../class/SendServices';
import {DaysOf} from '../class/Shedule/DaysOf';
import {DayOfWeek} from '../class/Shedule/dateOfweek';
import {AComment} from "../class/Shedule/AComment";
import {SendRecord} from "../class/services/SendServices";

@Injectable()

export  class SheduleServices {
    private url =  environment.Uri + 'Shedules/';
    constructor(private  http: HttpClient) {

    }
    getDaysOfWeek(token: string, month: string, year: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url + '?month=' + month + '&year=' + year, {headers } );
    }
    getallInformation(token: string, id: number) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url + 'all?id=' + id, {headers } );
    }

    getconcreteDay(token: string, id: number){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url + id, {headers } );
    }
    addDaysofWork(token: string, days: DayOfWeek) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(this.url, days, {headers } );
    }
    CancelService(token: string, id: number) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.delete(this.url + id, {headers } );
    }
    AddComment(token: string, id: number, comment: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        const body = new AComment(comment);
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.put(this.url + id, body,{headers } );
    }
    AddRecord(token: string, send: SendRecord){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(this.url + 'addservices', send,{headers } );
    }
    GetCancelled(token: string, id: number){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url +'cancelled?id='+id, {headers } );
    }
}
