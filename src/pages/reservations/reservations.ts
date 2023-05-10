import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservationsProvider } from '../../providers/reservations/reservations';
import { CarsProvider } from '../../providers/cars/cars';
import { UsersProvider } from '../../providers/users/users';




@IonicPage()
@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html',
})
export class ReservationsPage implements OnInit {
rentals = [
  {
    id: 1,
    start_date: new Date('2023-05-01'),
    end_date: new Date('2023-05-07'),
    vehicle: {
      id: 1,
      license_plate: 'ABC123',
      brand: 'Toyota',
      model: 'Corolla',
      type: 'Sedan',
      status: 'Available',
    },
    status: 'processing',
  },
  {
    id: 2,
    start_date: new Date('2023-05-10'),
    end_date: new Date('2023-05-15'),
    vehicle: {
      id: 2,
      license_plate: 'XYZ789',
      brand: 'Honda',
      model: 'Civic',
      type: 'Sedan',
      status: 'Unavailable',
    },
    status: 'unpaid',
  },
  {
    id: 3,
    start_date: new Date('2023-06-01'),
    end_date: new Date('2023-06-05'),
    vehicle: {
      id: 3,
      license_plate: 'DEF456',
      brand: 'Ford',
      model: 'F-150',
      type: 'Truck',
      status: 'Available',
    },
    status: 'Check_car_availability',
  },
];
  constructor(private carservice :CarsProvider,private userservice : UsersProvider,
    public navCtrl: NavController, public navParams: NavParams,private reservation : ReservationsProvider) {
  }
  ngOnInit(): void {
   //bring the list using the service
   let user_id =Number.parseInt( localStorage.getItem('id'))
   console.log(user_id);
   
   this.reservation.getRentalByUserId(user_id).then((re)=>console.log(re))



  }
  accordionExpanded = false;
  payment = false


  ttoggle() {
    this.accordionExpanded = !this.accordionExpanded;
   
  }

}
