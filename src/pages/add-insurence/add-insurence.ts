import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vehicle } from '../../app/classes';

/**
 * Generated class for the AddInsurencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-insurence',
  templateUrl: 'add-insurence.html',
})
export class AddInsurencePage {
  no_header : boolean = false
  FutureInsuredCar : Vehicle []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  add_car(car_list : Vehicle[]){
    this.FutureInsuredCar = car_list
  }

}
