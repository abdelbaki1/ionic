import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject, } from "@ionic-native/sqlite";
import { BehaviorSubject, Observable } from "rxjs";
import {  Rental, Vehicle } from "../../app/classes";
import { PromiseObservable } from "rxjs/observable/PromiseObservable";
import { CarsProvider } from "../cars/cars";

/*
  Generated class for the ReservationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservationsProvider {
  public database: SQLiteObject;
  public rentals: BehaviorSubject<Rental[]> = new BehaviorSubject([]);
  initPromise: Promise<void>;

  constructor(public sqlite: SQLite,private carservice : CarsProvider) {
    this.initPromise = this.sqlite.create({
      name: 'test.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log(db);
      this.database = db;
      return this.database.executeSql('CREATE TABLE IF NOT EXISTS rental (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, vehicle_id INTEGER, start_date TEXT, end_date TEXT, status TEXT, rent_date TEXT, FOREIGN KEY(user_id) REFERENCES user(id), FOREIGN KEY(vehicle_id) REFERENCES vehicle(id))', [])
        .then(() => console.log('Table rental created'))
        .catch(e => console.log('Error creating table rental', e));
    });
  }

  addRental(rental: Rental): Promise<any> {
    return this.initPromise.then(() => {
      console.log(rental.vehicle.id);
      
      
      return this.database.executeSql('INSERT INTO rental (user_id, start_date, end_date, vehicle_id, status) VALUES (?, ?, ?, ?, ?)',
        [rental.user.id, rental.start_date.toString(), rental.end_date.toString(), rental.vehicle.id, rental.status]);
    });
  }

  getAllRentals(): Promise<Rental[]> {
    return this.database.executeSql('SELECT * FROM rentals', []).then(data => {
      let rentals: Rental[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          console.log(data.rows.item(i));
          
          rentals.push(Rental.fromObject(data.rows.item(i)));
        }
      }
      return rentals;
    });
  }

  getRentalById(id: number): Promise<Rental> {
    return this.database.executeSql('SELECT * FROM rentals WHERE id = ?', [id]).then(data => {
      if (data.rows.length > 0) {
        return Rental.fromObject(data.rows.item(0));
      } else {
        return null;
      }
    });
  }

  updateRental(rental: Rental): Promise<any> {
    return this.database.executeSql('UPDATE rental SET user_id = ?, start_date = ?, end_date = ?, vehicle_id = ?, status = ?, rent_date = ? WHERE id = ?',
      [rental.user.id, rental.start_date.toString(), rental.end_date.toString(), rental.vehicle.id, rental.status, rental.rent_date.toString(), rental.id]);
  }

  deleteRental(id: number): Promise<any> {
    return this.database.executeSql('DELETE FROM rental WHERE id = ?', [id]);
  }


  // delete a rental from the database
  
  async changeVehicle(rentalId: number, newVehicle: Vehicle): Promise<Rental> {
    const rental = await this.getRentalById(rentalId);
    rental.vehicle = newVehicle;
    await this.updateRental(rental);
    return rental;
  }

  async changeStatus(rentalId: number, newStatus: string): Promise<Rental> {
    const rental = await this.getRentalById(rentalId);
    rental.status = newStatus;
    await this.updateRental(rental);
    return rental;
  }
  async getRentalByUserId(user_id: number): Promise<Rental[]> {
    return new Promise<Rental[]>((resolve, reject) => {
      this.database
        .executeSql("SELECT * FROM rental WHERE user_id = ?", [user_id])
        .then(async (result) => {
          let rentals: Rental[] = [];
          if (result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
              console.log(result.rows.item(i));
              const val = await this.carservice.getVehicleById(result.rows.item(i).vehicle_id)
              // .then(
              //   (val)=>{
                  rentals.push(Rental.fromObject(result.rows.item(i),val));
              //   })
            }resolve(rentals);
          }
          else {
            reject(new Error(`No rental found with id ${user_id}`));
          }
        })
        .catch((error) => reject(error));
    });
  }
}
