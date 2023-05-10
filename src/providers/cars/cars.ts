import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Vehicle } from "../../app/classes";
import { FormGroup } from "@angular/forms";
import { DatabaseProvider } from "../database/database";

/*
  Generated class for the CarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarsProvider {
  private database: SQLiteObject;
  initPromise: Promise<void>;
  constructor(private sqlite: SQLite) {
    this.initPromise = this.sqlite
      .create({
        name: "test.db",
        location: "default",
      })
      .then((db: SQLiteObject) => {
        console.log(db);
        this.database = db;
        return this.database
          .executeSql(
            "CREATE TABLE IF NOT EXISTS vehicles (id INTEGER PRIMARY KEY AUTOINCREMENT,image TEXT, age TEXT, license_plate TEXT, brand TEXT, model TEXT, type TEXT, status TEXT, hour_rate REAL)",
            []
          )
          .then(() => console.log("Table vehicles created"))
          .catch((e) => console.log("Error creating table vehicles", e));
      });
  }

  addVehicle(vehicle: Vehicle): Promise<any> {
    return this.initPromise.then(() => {
      return this.database.executeSql(
        "INSERT INTO vehicles (image,age, license_plate, brand, model, type, status) VALUES (?,?, ?, ?, ?, ?, ?)",
        [
          vehicle.image,
          vehicle.age,
          vehicle.license_plate,
          vehicle.brand,
          vehicle.model,
          vehicle.type,
          vehicle.status,
        ]
      );
    });
  }

  getAllVehicles(): Promise<Vehicle[]> {
    return this.database
      .executeSql("SELECT * FROM vehicles", [])
      .then((data) => {
        let vehicles: Vehicle[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            vehicles.push(Vehicle.fromObject(data.rows.item(i)));
          }
        }
        return vehicles;
      });
  }

  getVehicleById(id: number): Promise<Vehicle> {
    return this.database
      .executeSql("SELECT * FROM vehicles WHERE id = ?", [1])
      .then((data) => {
        if (data.rows.length > 0) {
          return Vehicle.fromObject(data.rows.item(0));
        } else {
          return null;
        }
      });
  }

  updateVehicle(vehicle: Vehicle): Promise<any> {
    return this.database.executeSql(
      "UPDATE vehicles SET age = ?, license_plate = ?, brand = ?, model = ?, type = ?, status = ? WHERE id = ?",
      [
        vehicle.age,
        vehicle.license_plate,
        vehicle.brand,
        vehicle.model,
        vehicle.type,
        vehicle.status,
        vehicle.id,
      ]
    );
  }

  deleteVehicle(id: number): Promise<any> {
    return this.database.executeSql("DELETE FROM vehicles WHERE id = ?", [id]);
  }

  async getFilteredVehicles(form: FormGroup): Promise<Vehicle[]> {
    const db: SQLiteObject = await this.database;
    const query = `
      SELECT *
      FROM vehicles
      WHERE age LIKE '%${form.value.age}%' AND license_plate LIKE '%${form.value.license_plate}%' AND brand LIKE '%${form.value.brand}%' AND model LIKE '%${form.value.model}%' AND type LIKE '%${form.value.type}%' AND status LIKE '%${form.value.status}%'
    `;
    const result = await db.executeSql(query, []);
    const vehicles: Vehicle[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      const vehicle = new Vehicle(
        row.id,
        row.license_plate,
        row.brand,
        row.model,
        row.type,
        row.status
      );
      vehicle.age = row.age;
      vehicle.hour_rate = row.hour_rate;
      vehicles.push(vehicle);
    }
    return vehicles;
  }

  async changeVehicleInRental(
    rentalId: number,
    newVehicleId: number
  ): Promise<void> {
    try {
      const query: string = "UPDATE rentals SET vehicle_id = ? WHERE id = ?";
      return this.database.executeSql(query, [newVehicleId, rentalId]);
    } catch (error) {
      console.error(error);
    }
  }

  filterVehicles(form: FormGroup): Promise<Vehicle[]> {
    let brand = form.get("brand").value;
    let seats = form.get("seats").value;
    let year = form.get("year").value;
    let hour_rate = form.get("hour_rate").value;
    let age = form.get("age").value;

    let query =
      "SELECT * FROM vehicles WHERE brand = ? AND seats >= ? AND year >= ? AND hour_rate <= ? AND age <= ?";
    let params = [brand, seats, year, hour_rate, age];

    return this.database
      .executeSql(query, params)
      .then((res) => {
        let vehicles = [];
        for (var i = 0; i < res.rows.length; i++) {
          vehicles.push(res.rows.item(i));
        }
        return vehicles;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }
}
