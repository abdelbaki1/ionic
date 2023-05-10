import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservationsProvider } from '../../providers/reservations/reservations';
import { Rental } from '../../app/classes';

/**
 * Generated class for the AdminReservationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-reservation-detail',
  templateUrl: 'admin-reservation-detail.html',
})
export class AdminReservationDetailPage {
  rental :Rental = {
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
      "age": "10",
      "license_plate": "ABC123",
      "brand": "Toyota",
      "model": "Corolla",
      "type": "sedan",
      "status": "available",
      "hour_rate": 55
    },
    "status": "unpaid",
    "rent_date": "2023-05-09T00:00:00.000Z"
  }
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private resService:ReservationsProvider ) {
  }
  ionionViewWillEnter(): void {
    let res_id = this.navParams.get('res_id')
    this.resService.getRentalById(res_id).then((rental)=>this.rental=rental)
  }

}
