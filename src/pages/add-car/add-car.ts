import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Vehicle } from "../../app/classes";
import { CarsProvider } from "../../providers/cars/cars";

/**
 * Generated class for the AddCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-add-car",
  templateUrl: "add-car.html",
})
export class AddCarPage {
  Car: Vehicle;
  car_id: number;
  upload : boolean = false;

  carForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private navParam: NavParams,
    private carservice: CarsProvider
  ) {
    this.createForm();
  }

  private createForm() {
    this.carForm = this.fb.group({
      id: ["", Validators.required],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      type: ["", Validators.required],
      year: [
        "",
        Validators.compose([
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ]),
      ],
      license_plate: ["", Validators.required],
      image : ["",Validators.required]
    });
    if (this.navParam.get("id")) {
      this.upload = true
      this.car_id = Number.parseInt(this.navParam.get("id"));
      console.log(this.navParam.get("id"), this.car_id);

      if (this.car_id != 0) {
        //grap the car object
        this.carservice.getVehicleById(this.car_id).then((v) => (this.Car = v));

        console.log(this.Car);

        this.carForm.patchValue(this.Car);
      }
    }
  }

  submitCarForm() {
    let car = this.carForm.value;
    // do something with the car data, such as add it to a database
    this.carservice.addVehicle(car).then(() => {
      console.log("added car ", car);
      this.navCtrl.pop();
    });
    // then navigate back to the previous page
  }
  add_image_to_car(image) {
    console.log(image);
    this.carForm.patchValue({'image':image})
    console.log(this.carForm.getRawValue);
    


  }
  update_car() {
    this.navCtrl.pop();
  }
}
