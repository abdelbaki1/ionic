import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Insurance } from '../../app/classes';

/*
  Generated class for the AssurenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssurenceProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(private sqlite: SQLite) {
    if (!this.isOpen) {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.db.executeSql('CREATE TABLE IF NOT EXISTS insurance(id INTEGER PRIMARY KEY AUTOINCREMENT, company TEXT, startDate TEXT, endDate TEXT, vehicle TEXT)', [])
            .then(res => console.log('Insurance table created'))
            .catch(e => console.log(e));
          this.isOpen = true;
        })
        .catch(e => console.log(e));
    }
  }

  addInsurance(insurance: Insurance) {
    return new Promise((resolve, reject) => {
      this.db.executeSql('INSERT INTO insurance (company, startDate, endDate, vehicle) VALUES (?, ?, ?, ?)', [insurance.company, insurance.start_date.toISOString(), insurance.end_date.toISOString(), JSON.stringify(insurance.vehicle)])
        .then(res => {
          console.log('Insurance added to the database');
          resolve(res);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }

  getAllInsurances() {
    return new Promise((resolve, reject) => {
      this.db.executeSql('SELECT * FROM insurance', [])
        .then(res => {
          const items: Insurance[] = [];
          for (let i = 0; i < res.rows.length; i++) {
            items.push(Insurance.fromObject(res.rows.item(i)));
          }
          resolve(items);
        })
        .catch(e => reject(e));
    });
  }

  updateInsurance(insurance: Insurance) {
    return new Promise((resolve, reject) => {
      this.db.executeSql('UPDATE insurance SET company=?, startDate=?, endDate=?, vehicle=? WHERE id=?', [insurance.company, insurance.start_date.toISOString(), insurance.end_date.toISOString(), JSON.stringify(insurance.vehicle), insurance.id])
        .then(res => {
          console.log('Insurance updated in the database');
          resolve(res);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }

  deleteInsurance(id: number) {
    return new Promise((resolve, reject) => {
      this.db.executeSql('DELETE FROM insurance WHERE id=?', [id])
        .then(res => {
          console.log('Insurance deleted from the database');
          resolve(res);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }

}
