import {DayPilot} from 'daypilot-pro-angular';

export interface SendBusiness {
    id: number;
    services_name: string;
    start: DayPilot.Date;
    end: DayPilot.Date;
    resource: string;
    html: string;
    account_id: number;
}
