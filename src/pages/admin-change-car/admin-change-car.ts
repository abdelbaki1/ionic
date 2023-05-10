import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vehicle } from '../../app/classes';
import { CarsProvider } from '../../providers/cars/cars';
import { CarDetailPage } from '../car-detail/car-detail';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AdminChangeCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-change-car',
  templateUrl: 'admin-change-car.html',
})
export class AdminChangeCarPage implements OnInit {
selectedCar : Vehicle
  vehicleForm: any;
  res_id :any
  constructor(public navCtrl: NavController, public navParams: NavParams,private carservice : CarsProvider,private fb :FormBuilder) {
    this.createForm()
  }
  ngOnInit(): void {
    this.carservice.getAllVehicles().then((v)=>this.vehicles= v)
    this.res_id = this.navParams.get('res_id')
    
  }
  vehicles: any[];
  selectedBrand: string;
  selectedSeats: number;
  selectedYear: number;
  brands: string[] = ['Toyota', 'Honda', 'Nissan', 'Ford'];
  seatOptions: number[] = [2, 4, 5, 7, 8];
  yearOptions: number[] = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  rateOptions =[5,4,6,3]
  ageOptions: string[] = ["1", "2", "3", "4"];
  createForm() {
    this.vehicleForm = this.fb.group({
      brand: [null, Validators.required],
      seats: [null, Validators.required],
      year: [null, Validators.required],
      hour_rate: [null, Validators.required],
      age: [null, Validators.required],
    });
  }


  confirm_car(){
    this.carservice.changeVehicleInRental(this.res_id,this.selectedCar.id).then(()=>this.navCtrl.pop())
    
  }
  filter_car(){
   this.carservice.filterVehicles(this.vehicleForm).then((v)=>this.vehicles=v)
  }
  select_car(v){this.selectedCar= v}
  detail_car(id){
    this.navCtrl.push(CarDetailPage,{'id':id})
  }

}
