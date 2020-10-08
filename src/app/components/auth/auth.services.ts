import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()

export  class AuthServices {
  //  private url = 'https://localhost:44304/api/auths/';
    private testurl = 'http://185.220.35.179/api/auths/';
    private url = 'http://185.220.35.179/api/auths/';
    constructor(private  http: HttpClient) {

        }

changepassword(email: string) {
    const data = {email}
    const  headers: HttpHeaders = new HttpHeaders();
    return this.http.put(this.url + 'password', data, {headers});
}
    getAuth(email: string, password: string, role: string) {
        const data = {email, password, role}
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.post(this.url + 'token', data, {headers});
    }
    registration(email: string, password: string, role: string) {
        const data = {email, password, role}
        const  headers: HttpHeaders = new HttpHeaders();
        return this.http.post(this.url, data, {headers});
    }

    // registration(email: string, password: string, role: string) {
    //     const  headers: HttpHeaders = new HttpHeaders();
    //     const auth = {email, password, role};
    //     return this.http.post(this.url, auth, {headers});
    // }
    rememberGenerate(username: string){
        const  headers: HttpHeaders = new HttpHeaders();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.put(this.url + '/change_password/order' + '?user=' + username, {headers} );
    }
    changePsw(password: string, link: string){
        const  headers: HttpHeaders = new HttpHeaders();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.put(this.url + '/change_password/user' + '?link=' + link + '&password=' + password,
            {headers} );
    }
}
