
export class DayOfWeek {
     id: number;
dttmStart: Date;
dttmEnd: Date;
accountId: number;
constructor(id: number, dttmStart: Date, dttmEnd: Date, accountId: number) {
    this.dttmStart = dttmStart;
    this.dttmEnd = dttmEnd;
    this.id = id;
    this.accountId = accountId;
}
}
