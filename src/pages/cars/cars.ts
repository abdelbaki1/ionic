import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import {
  InfiniteScroll,
  IonicPage,
  NavController,
  NavParams,
} from "ionic-angular";
import { AddCarPage } from "../add-car/add-car";
import { CarDetailPage } from "../car-detail/car-detail";
import { CarsProvider } from "../../providers/cars/cars";
import { Vehicle } from "../../app/classes";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { InfiniteScrollCustomEvent } from '@ionic/angular'

/**
 * Generated class for the CarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-cars",
  templateUrl: "cars.html",
})
export class CarsPage {
  @Input() header: Boolean = true;
  @Output() selectedcars: EventEmitter<Vehicle[]> = new EventEmitter();
  encapsulation: ViewEncapsulation.None;
  vehicles: any[];
  filteredVehicles: any[];
  selectedBrand: string;
  selectedSeats: number;
  selectedYear: number;
  brands: string[] = ["Toyota", "Honda", "Nissan", "Ford"];
  seatOptions: number[] = [2, 4, 5, 7, 8];
  yearOptions: number[] = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  rateOptions =[5,4,6,3]
  ageOptions: string[] = ["1", "2", "3", "4"];
  rows = [];

  temp = [];

  columns = [{ prop: "name" }, { name: "Company" }, { name: "Gender" }];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ColumnMode = ColumnMode;
  vehicleForm: FormGroup;

  createForm() {
    this.vehicleForm = this.fb.group({
      brand: [null, Validators.required],
      seats: [null, Validators.required],
      year: [null, Validators.required],
      hour_rate: [null, Validators.required],
      age: [null, Validators.required],
    });
  }

  constructor(
    private nav: NavController,
    private carservice: CarsProvider,
    private fb: FormBuilder
  ) {
    this.createForm();
  }
  loadcars(event: InfiniteScroll) {
    console.log(event);
    event.complete();
  }
  ionViewWillEnter(): void {
    this.carservice.getAllVehicles().then((v)=>{this.vehicles = v;console.log(this.vehicles);
    });
  }
  delete(id) {
    this.carservice.deleteVehicle(id).then(()=>console.log("deleted",id))
    alert("Deleted ");
  }
  filterCar() {
    console.log(this.vehicleForm.getRawValue());
    this.carservice.filterVehicles(this.vehicleForm).then(
      (cars)=>this.vehicles=cars)
  }

  to_add_car() {
    console.log("to add car");
    
    this.nav.push(AddCarPage);
  }
  detail_car(id) {
    this.nav.push(CarDetailPage,{'id':id});
  }
}
