import { Component, OnInit } from '@angular/core';
import * as chartData from '../../shared/data/chart';
import { doughnutData, pieData } from '../../shared/data/chart';
import {IndicatorServices} from '../../shared/service/indicator.service';
import {DataServices} from '../../shared/service/data.services';
import {SendAuth} from '../../shared/class/auth/SendAuth';
import {Answer} from "../../shared/class/helpers/Response";
import {Indicator} from "../../shared/class/indicators/Indicator";
import {CookieService} from "ngx-cookie-service";
import {StaffServices} from "../../shared/service/staff.services";
import {DomSanitizer} from "@angular/platform-browser";
import {MainIndicators} from "../../shared/class/indicators/MainIndicators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [IndicatorServices, StaffServices]
})
export class DashboardComponent implements OnInit {
  private user: SendAuth;
  MIndicators: MainIndicators;
  main: Indicator[];
  constructor(private indicator: IndicatorServices, private dataservices: DataServices,
              private sanitizer: DomSanitizer, private cookieService: CookieService, private staff: StaffServices) {
    Object.assign(this, { doughnutData, pieData })
    this.dataservices.users.subscribe(result => {
      if (result === undefined || result === null) {
        this.user = JSON.parse(this.cookieService.get('user'));
        this.dataservices.SendAccount(this.user);
      } else {
        this.user = result;
      }
    });
  }
  public doughnutData = doughnutData;
  public pieData = pieData;

  // doughnut 2
  public view = chartData.view;
  public doughnutChartColorScheme = chartData.doughnutChartcolorScheme;
  public doughnutChartShowLabels = chartData.doughnutChartShowLabels;
  public doughnutChartGradient = chartData.doughnutChartGradient;
  public doughnutChartTooltip = chartData.doughnutChartTooltip;

  public chart5 = chartData.chart5;


  // lineChart
  public lineChartData = chartData.lineChartData;
  public lineChartLabels = chartData.lineChartLabels;
  public lineChartOptions = chartData.lineChartOptions;
  public lineChartColors = chartData.lineChartColors;
  public lineChartLegend = chartData.lineChartLegend;
  public lineChartType = chartData.lineChartType;

  // lineChart
  public smallLineChartData = chartData.smallLineChartData;
  public smallLineChartLabels = chartData.smallLineChartLabels;
  public smallLineChartOptions = chartData.smallLineChartOptions;
  public smallLineChartColors = chartData.smallLineChartColors;
  public smallLineChartLegend = chartData.smallLineChartLegend;
  public smallLineChartType = chartData.smallLineChartType;

  // lineChart
  public smallLine2ChartData = chartData.smallLine2ChartData;
  public smallLine2ChartLabels = chartData.smallLine2ChartLabels;
  public smallLine2ChartOptions = chartData.smallLine2ChartOptions;
  public smallLine2ChartColors = chartData.smallLine2ChartColors;
  public smallLine2ChartLegend = chartData.smallLine2ChartLegend;
  public smallLine2ChartType = chartData.smallLine2ChartType;

  // lineChart
  public smallLine3ChartData = chartData.smallLine3ChartData;
  public smallLine3ChartLabels = chartData.smallLine3ChartLabels;
  public smallLine3ChartOptions = chartData.smallLine3ChartOptions;
  public smallLine3ChartColors = chartData.smallLine3ChartColors;
  public smallLine3ChartLegend = chartData.smallLine3ChartLegend;
  public smallLine3ChartType = chartData.smallLine3ChartType;

  // lineChart
  public smallLine4ChartData = chartData.smallLine4ChartData;
  public smallLine4ChartLabels = chartData.smallLine4ChartLabels;
  public smallLine4ChartOptions = chartData.smallLine4ChartOptions;
  public smallLine4ChartColors = chartData.smallLine4ChartColors;
  public smallLine4ChartLegend = chartData.smallLine4ChartLegend;
  public smallLine4ChartType = chartData.smallLine4ChartType;

  public chart3 = chartData.chart3;

  public settings = {

    mode: 'external',

    columns: {
      hours: {
        title: 'Количество часов'
      },
      earnings: {
        title: 'Заработок'
      },
      client: {
        title: 'Длительность',
      },
      consumption: {
        title: 'Расходы',
      }
    },
  };



  // events
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  ngOnInit() {
    this.MIndicators = {sum: 0, new: 0, orders: 0};
this.indicator.getMainIndividual(this.user.token).subscribe(
    (result: Answer) => {
      if (result.status.code === 200 )
      this.MIndicators = result.responce as MainIndicators;
    }
);
    this.indicator.getIndicators(this.user.token, 'week').subscribe(
        (result: Answer) => {
          if (result.status.code === 200) {
            this.main = result.responce as Indicator[];
            for (const a of this.main) {
              this.staff.getUserpic(this.user.token, a.id).subscribe(
                  resultavatar => {
                    const unsafeImageUrl = URL.createObjectURL(resultavatar);
                    a.avatar = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
                  });
            }
          }
        }
    );
        }

}
