import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeeOwner} from "../../../shared/class/staff/EmployeeOwner";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  private name: any;
  counter: any;
  user: EmployeeOwner;
  img: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['id'];
    });
  }

  open(content: TemplateRef<any>) {
    
  }

  decrement() {
    
  }

  increment() {
    
  }
}
