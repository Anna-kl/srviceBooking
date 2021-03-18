import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {EmployeeOwner} from '../class/staff/EmployeeOwner';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {Answer} from '../class/helpers/Response';

@Injectable()

export  class IndicatorServices {
    private url = environment.Uri_p;

    constructor(private  http: HttpClient) {

    }

    getIndicators(token: string, date:string){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url  + '?dttm=' + date,  {headers} );
    }
}