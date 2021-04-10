import {DayOfWeek} from "./dateOfweek";

export interface SendCalendar {
    id_staff: number;
    days: string[];
    avatar: any;
}


export class StaffData{
    constructor(
        avatar: any,
        days: string[]
    ) {}
}
