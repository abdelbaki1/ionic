import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminReservationDetailPage } from '../admin-reservation-detail/admin-reservation-detail';
import { ReservationsProvider } from '../../providers/reservations/reservations';
import { Rental } from '../../app/classes';

/**
 * Generated class for the ReservationsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservations-list',
  templateUrl: 'reservations-list.html',
})
export class ReservationsListPage {
  reservations : Rental[] =[
    {
      "id": 1,
      "user": {
        "id": "1234",
        "first_name": "John",
        "last_name": "Doe",
        "password": "password"
      },
      "start_date": "2023-05-09T00:00:00.000Z",
      "end_date": "2023-05-12T00:00:00.000Z",
      "vehicle": {
        "id": 1,
        "age": null,
        "license_plate": "ABC123",
        "brand": "Toyota",
        "model": "Corolla",
        "type": "sedan",
        "status": "available",
        "hour_rate": null
      },
      "status": "unpaid",
      "rent_date": "2023-05-09T00:00:00.000Z"
    }
    
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,private reservationservice : ReservationsProvider) {
  }
  ionViewWillEnter(): void {
    console.log("oninit");
    this.reservationservice.getAllRentals().then(
      (res)=>{this.reservations=res;console.log(this.reservations);
      })
    
  }

  reservation_detail(res_id)
  {
    this.navCtrl.push(AdminReservationDetailPage,{'res_id':res_id})
  }

}
