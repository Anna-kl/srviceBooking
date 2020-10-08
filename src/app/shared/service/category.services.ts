import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()

export  class CategoryServices {
    //  private url = 'https://localhost:44304/api/auths/';
    private testurl = 'http://185.220.35.179/api/categories/';
    private url = 'https://localhost:44304/api/categories';

    constructor(private  http: HttpClient) {

    }
    getGeneral(level: number) {
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.get(this.url + '?level=' + level);
    }
}
