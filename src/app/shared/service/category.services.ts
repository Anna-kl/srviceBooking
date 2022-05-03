import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {environment} from "../../../environments/environment.prod";

@Injectable()

export  class CategoryServices {
    //  private url = 'https://localhost:44304/api/auths/';
  //  private url = 'http://185.220.35.179/api/categories/';
    private url = environment.Uri + 'categories/';

    constructor(private  http: HttpClient) {

    }
    getGeneral() {
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.get(this.url);
    }

    getOwnerCategories(token: string, level: number, parent: number) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(`${this.url}owner-category?level=${level}&parent=${parent}`, {headers});
    }

    getSubCategory(level: number, parent: number) {
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.get(this.url + 'Subcategory?level=' + level + '&parent=' + parent, {headers});
    }
    getSubCategoryBissness(token: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url + 'bissness', {headers});
    }
    getCategoriesServices(token: string) {
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get(this.url + 'services', {headers});
    }

}
