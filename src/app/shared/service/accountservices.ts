import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {SendAcount} from '../class/account/SendAcount';
import {environment} from '../../../environments/environment.prod';

@Injectable()

export  class AccountServices {
    private url = environment.Uri;
    // private url = 'http://185.220.35.179/api/categories/';

    // private urlaccount = 'https://localhost:44304/api/accounts/';
    private urlaccount = environment.Uri + 'accounts/';
   // private urlaccount = 'http://185.220.35.179/api/accounts/';
    constructor(private  http: HttpClient) {

    }
    uploadUserPic(header: string, file: File){
        let  headers: HttpHeaders = new HttpHeaders();
        const formData = new FormData();

        formData.append('file', file, file.name);
        headers = headers.append('Authorization', 'Bearer ' + header);
        return this.http.post(this.urlaccount + 'userpic', formData, {headers} );
    }
    getUserpic(token: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.urlaccount + 'userpic', {headers, responseType: 'blob'} );
    }
    getAccount(id: number, token: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.urlaccount + id.toString(), {headers } );
    }
    updateAccount(send: SendAcount, token: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(this.urlaccount, send, {headers} );
    }
}
