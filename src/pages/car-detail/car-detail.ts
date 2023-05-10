import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddCarPage } from '../add-car/add-car';
import { Vehicle } from '../../app/classes';
import { CarsProvider } from '../../providers/cars/cars';

/**
 * Generated class for the CarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html',
})
export class CarDetailPage implements OnInit {
  // car 
  Car : Vehicle
  items = [
        {
          name: 'one',
          slides: [
          {
            title: 'For the Weekend',
            imageUrl: 'assets/img/bmw.jpg',
            songs: 4,
            private: false
          },
          {
            title: 'Family Time',
            imageUrl: 'assets/img/bmw.jpg',
            songs: 5,
            private: true
          },
          {
            title: 'My Trip',
            imageUrl: 'assets/img/bmw.jpg',
            songs: 12,
            private: true
          }]
        },
      ];

  constructor(public navCtrl: NavController, public navParams: NavParams,private carservice :CarsProvider) {
  }
  ngOnInit(): void {
   
      let car_id = this.navParams.get('id');
      console.log(car_id);
      
      this.carservice.getVehicleById(car_id).then(
        (v)=>{this.Car= v;console.log(this.Car);
        })

      // use the car service to bring the car to be disoplayed
    
  }

  navigate_to_update_car(car_id){
    console.log(car_id);
    
    this.navCtrl.push(AddCarPage,{'id':car_id})

  }

}
