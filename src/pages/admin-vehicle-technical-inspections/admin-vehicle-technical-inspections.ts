import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminVehicleTechnicalInspectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-vehicle-technical-inspections',
  templateUrl: 'admin-vehicle-technical-inspections.html',
})
export class AdminVehicleTechnicalInspectionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  currentEvents = [
    {
      year: 2023,
      month: 3,
      date: 30
    },
    {
      year: 2023,
      month: 10,
      date: 25
    }
  ];
}
