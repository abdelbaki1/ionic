import { Component, Input } from '@angular/core';
import { Rental } from '../../app/classes';
import { NavController } from 'ionic-angular';
import { AdminChangeCarPage } from '../../pages/admin-change-car/admin-change-car';
import { ReservationsProvider } from '../../providers/reservations/reservations';

/**
 * Generated class for the AdminReservationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'admin-reservations',
  templateUrl: 'admin-reservations.html'
})
export class AdminReservationsComponent {
  @Input() rental_object : Rental ={
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
      "hour_rate": 5
    },
    "status": "processeing",
    "rent_date": "2023-05-09T00:00:00.000Z"
  }
  
  text: string;

  constructor(private navctr : NavController,private reservationservice : ReservationsProvider) {
    console.log('Hello AdminReservationsComponent Component');
   
    this.text = 'Hello World';
  }
  confirm_reservation(){
  alert(' you have confirmed this reservation, the payment section will be enabled to the user')
  //change the reservation status to unpaid
  this.reservationservice.changeStatus(this.rental_object.id,'unpaid').then(()=>this.navctr.pop())
  this.navctr.pop()

  }
navigate_to_change_car(){
  this.navctr.push(AdminChangeCarPage,{'res_id':this.rental_object.id})

}

}
