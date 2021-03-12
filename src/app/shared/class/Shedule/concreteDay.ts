import {DaysOf} from "./DaysOf";
import {DayOfWeek} from "./dateOfweek";
import {ConcreteSend} from "./concreteSend";

export interface ConcreteDay {
    id: number;
    comment: string;
    dttm_start: Date;
    dttm_end: Date;
    account_id: number;
    price: number;
    category_id: number;
}

export interface SendConcrete {
    start: Date;
    end: Date;
    id_day: number;
    send: ConcreteSend[];

}


export interface SendAllInfo {
    start_dttm: Date;
    end_dtt: Date;
    comment_client: string;
    iscanceled: boolean;
    name_client: string;
    client_id: number;
    services_name: string;
    comment_service: string;
    price: number;
    id: number;
}
