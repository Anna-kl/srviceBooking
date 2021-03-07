import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SendAuth} from '../class/auth/SendAuth';


@Injectable()
export class DataServices {
    private user = new BehaviorSubject<SendAuth>(null);
    private userpic = new BehaviorSubject<any>(null);
    // private store = new BehaviorSubject<StoreSend>(null);
    // private productid = new BehaviorSubject<number>(null);
    users = this.user.asObservable();
    userpics = this.userpic.asObservable();
    // stores = this.store.asObservable();
    // idProduct = this.productid.asObservable();
   // private url = 'https://localhost:44334/api/accounts';

    // private url = 'https://localhost:44334/api/accounts';
    constructor(private  http: HttpClient) {

    }
    SendAccount(User: SendAuth) {
        this.user.next(User);
    }
    SendUserpic(image: any) {
        this.userpic.next(image);
    }
}
