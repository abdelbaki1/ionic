import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: any;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  onSubmit() {
    // Submit form data here
    console.log({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      profileImage: this.profileImage,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
