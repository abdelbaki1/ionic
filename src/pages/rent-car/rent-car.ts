import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RentCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rent-car',
  templateUrl: 'rent-car.html',
})
export class RentCarPage {

  vehicleType: string;
  pickUpDate: string;
  returnDate: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  confirmRental() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Rental',
      message: `You have selected a ${this.vehicleType} rental from ${this.pickUpDate} to ${this.returnDate}.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            // Handle rental confirmation here
          }
        }
      ]
    });

    alert.present();
  }
}
