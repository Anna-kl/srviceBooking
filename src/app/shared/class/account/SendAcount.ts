import {stringify} from "querystring";

export class SendAcount {
level0: number;
level1: number;
name: string;
address: string;
update: Date;
email: string;

phone: string;
constructor(level0: number, level1: number,  name: string, address: string,
            email: string,  phone: string){
    this.phone = phone;
    this.address = address;
    this.name = name;
    this.level0 = level0;
    this.level1 = level1;
    this.email = email;
}
}
