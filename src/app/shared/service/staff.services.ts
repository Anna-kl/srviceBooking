import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {EmployeeOwner} from "../class/staff/EmployeeOwner";
import {environment} from "../../../environments/environment.prod";
import {Observable} from "rxjs";
import {Answer} from "../class/helpers/Response";

@Injectable()

export  class StaffServices {
    private url = environment.Uri + 'staff/';
  //  private url = 'http://185.220.35.179/api/categories/';

    //  private url = 'https://localhost:44304/api/categories/';

    constructor(private  http: HttpClient) {

    }
    uploadUserPic(header: string, id: number, file: File) {
        let  headers: HttpHeaders = new HttpHeaders();
        const formData = new FormData();

        formData.append('file', file, file.name);
        headers = headers.append('Authorization', 'Bearer ' + header);
        return this.http.post(this.url + 'userpic?id=' + id, formData, {headers} );
    }
    addAccount(token: string, employee: EmployeeOwner) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(this.url, employee, {headers} );
    }
    getAccount(token: string): any {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return   this.http.get(this.url, {headers});
    }
    getStaff(token: string, id: number){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return   this.http.get(this.url + id.toString(), {headers});
    }
    getUserpic(token: string, id: number): any {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url + 'userpic?id=' + id, {headers, responseType: 'blob'} );
    }
    updateStaff(token: string, employee: EmployeeOwner) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.put(this.url, employee, {headers} );
    }
}
