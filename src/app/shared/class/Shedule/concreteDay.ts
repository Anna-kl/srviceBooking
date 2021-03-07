import {DaysOf} from "./DaysOf";
import {DayOfWeek} from "./dateOfweek";

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
    day: DayOfWeek;
    concrete: ConcreteDay[];

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
}
