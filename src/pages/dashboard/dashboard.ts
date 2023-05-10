import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('pieCanvas') pieCanvas;
  barChart: any;
  pieChart : any;
  ngAfterViewInit() {
    setTimeout(() => {
      this.barChart = this.getBarChart();
      this.pieChart = this.getPieChart()
    }, 150);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }


  getPieChart() {
    const data = {
      labels: ['Mars', 'avril', 'Mai'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);

  }
  getBarChart() {
    const data = {
      labels: ['Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }
  selectedDate: any;
  currentEvents = [
    {
      year: 2023,
      month: 4,
      date: 30
    },
    {
      year: 2023,
      month: 4,
      date: 25
    }
  ];

  ondatechange(event: any) {
    console.log(event);
    
    this.selectedDate = event
  }
  logout(){
    this.navCtrl.setRoot(LoginPage)
  }

}
