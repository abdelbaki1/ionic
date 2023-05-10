import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { NotificationsPage } from '../notifications/notifications';
import { AddCarPage } from '../add-car/add-car';
import { AddInsurencePage } from '../add-insurence/add-insurence';

/**
 * Generated class for the AssurencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-assurences',
  templateUrl: 'assurences.html',
})
export class AssurencesPage {


  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  constructor(public nav: NavController, public popoverCtrl: PopoverController) {
  }
  add_insurence(){
    this.nav.push(AddInsurencePage)
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
  items = [
    {
      imageUrl: 'assets/img/bmw.jpg',
      title: 'bmv',
      place: 'bmv',
      date: '05/06/2016'
    },
    
  ];

  delete(item) {
    alert('Deleted ' + item.title);
  }

  viewComments(item) {
    alert('Viewing comments of ' + item.title);
  }

  viewPlayers(item) {
    alert('Viewing players of ' + item.title);
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    
  }
  to_add_car(){
    this.nav.push(AddCarPage)
  }



}
