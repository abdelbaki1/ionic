import { Component, ElementRef, Renderer2 } from "@angular/core";
import { NavController } from "ionic-angular";
import { CarDetailPage } from "../../pages/car-detail/car-detail";
import { FormControl, FormGroup } from "@angular/forms";
import { Rental, User, Vehicle } from "../../app/classes";
import { CarsProvider } from "../../providers/cars/cars";
import { ReservationsProvider } from "../../providers/reservations/reservations";
import { UsersProvider } from "../../providers/users/users";
import { DashboardPage } from "../../pages/dashboard/dashboard";
import { InsceptionProvider } from "../../providers/insception/insception";
// import 'intl-tel-input';
// import 'jquery-nice-select';
/**
 * Generated class for the ReservationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "reservations",
  templateUrl: "reservations.html",
})
export class ReservationsComponent {
  user: User;

  filteredVehicles : Vehicle [] =[]
  // [
  //   {
  //     imageUrl: "assets/img/bmw.jpg",
  //     brand: "bmv",
  //     model: "bmv",
  //     type: "bmw",
  //     date: "05/06/2016",
  //     id:3
  //   },
  //   {
  //     id :2,
  //     imageUrl: "assets/img/bmw.jpg",
  //     brand: "bmv",
  //     model: "bmv",
  //     type: "bmw",
  //     date: "05/06/2016",
  //   },
  // ];
  selectedCars: any[] = [];
  vehicles: Array<any> = [
    {
      brand: "Brand A",
      model: "Model X",
      type: "Luxury",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      brand: "Brand B",
      model: "Model Y",
      type: "Standard",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      brand: "Brand C",
      model: "Model Z",
      type: "Luxury",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];
  filterparams: FormGroup = new FormGroup({
    brand: new FormControl(""),
    seats: new FormControl(""),
    year: new FormControl(""),
  });
  rentalForm = new FormGroup({
    rentType: new FormControl(""),
    start_date: new FormControl(""),
    end_date: new FormControl(""),
    vehicle: new FormControl(""),
    status: new FormControl("processing"),
  });

  isSelected(v: Vehicle) {
    console.log("isSelcted");

    return this.selectedCars.indexOf(v) != -1;
  }

  select_car(car: any) {
    // this.selectedCar = car;
    const index = this.selectedCars.indexOf(car);
    if (index === -1) {
      this.selectedCars.push(car);
    } else {
      this.selectedCars.splice(index, 1);
    }
  }
  selectedBrand: string;
  selectedSeats: number;
  selectedYear: number;
  brands: string[] = ["Toyota", "Honda", "Nissan", "Ford"];
  seatOptions: number[] = [2, 4, 5, 7, 8];
  yearOptions: number[] = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];

  carSelectFieldset = this.el.nativeElement.querySelector("#car_select");
  rentTypeFieldset = this.el.nativeElement.querySelector("#rent_type");
  paymentfieldset = this.el.nativeElement.querySelector("#payment");
  agencyfieldset = this.el.nativeElement.querySelector("#agency_select");
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private nav: NavController,
    private carservice: CarsProvider,
    private rentservice: ReservationsProvider,
    private userservice: UsersProvider,
    private ins :InsceptionProvider
    
  ) {
    carservice.getAllVehicles().then((vs)=>this.filteredVehicles=vs)

  }

  moveFieldsetToFirst(id: string, id_number, back = false): void {
    const fieldset: ElementRef = new ElementRef(document.getElementById(id));
    const progress = document.getElementById(id_number);

    if (fieldset.nativeElement.previousElementSibling) {
      this.renderer.insertBefore(
        fieldset.nativeElement.parentNode,
        fieldset.nativeElement,
        fieldset.nativeElement.parentNode.firstChild
      );
      if (back) progress.classList.remove("active");
      else progress.classList.add("active");
    }
  }
  detail_car(car_id) {
    this.nav.push(CarDetailPage, car_id);
  }
  confirmRental() {
    console.log(this.filteredVehicles);
    
    var rental: Rental = this.rentalForm.value;
    rental.rent_date = new Date().toUTCString();
    this.userservice.getUserById(localStorage.getItem("id")).then((user) => {
      console.log(localStorage.getItem("id"));

      console.log(user);

      rental.user = user;
      this.user = user;
      this.selectedCars.forEach((car) => {
        rental.vehicle = car;
        console.log(rental);
        this.rentservice
          .addRental(rental)
          .then(() => {
            this.ins.addInspection( new Date(),car,'return the car ')
            
            alert('you have rented a car , an admin is notified with your reservation , please check your reservation list to follow your request')
            this.nav.setRoot(DashboardPage);console.log("added", rental)});
      });
    });
  }

  //use  the localhost to get the user id

  // use the rental service to add a rental
  filter_car() {
    // dont forget to add more filtersn inputs
    console.log(this.filterparams.value);
    // call the service to filter the car
  }
}
