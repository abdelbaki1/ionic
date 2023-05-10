import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { InsceptionProvider } from '../../providers/insception/insception';

/**
 * Generated class for the DashboardClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard-client',
  templateUrl: 'dashboard-client.html',
})
export class DashboardClientPage {
  events : any[] =[]
  selectedDate : any

  constructor(public navCtrl: NavController, public navParams: NavParams,private ins : InsceptionProvider) {
    ins.getInspections().subscribe((i)=>this.events=i)
    // this.events.push({
    //   title: 'Meeting with John',
    //   description: 'Discuss project timeline',
    //   date: new Date('2023-05-08T14:30:00Z')
    // });

    // this.events.push({
    //   title: 'Lunch with Sarah',
    //   description: 'Try out new sushi place',
    //   date: new Date('2023-05-08T12:00:00Z')
    // });

    // this.events.push({
    //   title: 'Gym workout',
    //   description: 'Leg day',
    //   date: new Date('2023-05-09T17:00:00Z')
    // });
  }
  onDateSelect() {
    // Clear the existing events
    this.events = [];
    this.events = this.events.filter(event => {
      return event.date.getTime() === this.selectedDate.getTime();
    });    
  }
  log(event){console.log(event);
  }
  logout(){
    this.navCtrl.setRoot(LoginPage)
  }

}
