export class SendServices {
    services_id: number;
    client_name: string;
    start: Date;
    client_id: number;
    phone: string;
    services_comment: string;
    constructor( services_id: number,  client_name: string,  start: Date, client_id: number, phone: string,  services_comment: string){
        this.client_id=client_id;
        this.client_name=client_name;
        this.phone=phone;
        this.start=start;
        this.services_comment=services_comment;
        this.services_id=services_id;
    }
}