import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {EmployeeOwner} from '../class/staff/EmployeeOwner';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Answer} from '../class/helpers/Response';
import {SendDate} from '../class/client/SendDare';

@Injectable()

export  class ClientServices {
    private url = environment.Uri + 'business/';
    constructor(private  http: HttpClient) {

    }
    getPhotos(token: string, phone: string) {
        let  headers: HttpHeaders = new HttpHeaders();

        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url  + 'find?phone=' + phone,  {headers} );
    }
    getStaffs(token: string, date: Date){
        let  headers: HttpHeaders = new HttpHeaders();
        const Dttm=new SendDate(date);
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(this.url  + 'staff', Dttm,  {headers} );
    }
}
