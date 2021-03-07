import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {SendAcount} from '../class/account/SendAcount';
import {environment} from '../../../environments/environment.prod';
import {SendServices} from '../class/SendServices';

@Injectable()

export  class ServicesServices {
    private url =  environment.Uri + 'Services/';
    constructor(private  http: HttpClient) {

    }
    getPhotos(token: string, id: number) {
        let  headers: HttpHeaders = new HttpHeaders();

        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url  + 'photo?id=' + id,  {headers} );
    }
    deleteServices(header: string, id: number) {
        let  headers: HttpHeaders = new HttpHeaders();
       
        headers = headers.append('Authorization', 'Bearer ' + header);
        return this.http.delete(this.url  + id,  {headers} );
    }
    uploadUserPhoto(header: string, file: File, id: number) {
        let  headers: HttpHeaders = new HttpHeaders();
        const formData = new FormData();

        formData.append('file', file, file.name);
        headers = headers.append('Authorization', 'Bearer ' + header);
        return this.http.post(this.url + 'photo?id=' + id, formData, {headers} );
    }
    getServices(header: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + header);
        return this.http.get(this.url, {headers } );
    }
    addService(token: string, send: SendServices) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.post(this.url, send, {headers } );
    }

    updateService(token: string, send: SendServices) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.put(this.url + send.id, send, {headers } );
    }
}
