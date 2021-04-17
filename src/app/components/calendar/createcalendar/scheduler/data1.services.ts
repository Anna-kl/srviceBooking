import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

    events: any[] = [
        {
            id: 10,
            start: DayPilot.Date.today().addHours(12),
            end: DayPilot.Date.today().addHours(14),
       //     text: "Event 1",
            html: '<div class="card" style="margin: 0;  line-height: 0">' +
                '  <div class="card-body" style="margin: 0; line-height: 0">' +
                '    <h5 class="card-title" style="height: 10px; margin-top: -30">Card title</h5>' +
                '    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>' +
                '  </div>' +
                '</div> ',
            resource: 'Климова Анна',
        },
        
    ];

    resources: any[] = [
        {
            name: "Климова Анна", id: "Климова Анна", children: [
                {name: "Resource 1", id: "R1"},
                {name: "Resource 2", id: "R2"},
                {name: "Resource 3", id: "R3"},
                {name: "Resource 4", id: "R4"}
            ]
        },
       
    ];

    constructor(private http: HttpClient) {
    }

    getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

        // simulating an HTTP request
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.events);
            }, 200);
        });

        // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
    }

    getResources(): Observable<any[]> {

        // simulating an HTTP request
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.resources);
            }, 200);
        });

        // return this.http.get("/api/resources");
    }


}
