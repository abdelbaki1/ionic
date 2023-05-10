import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentalAgency } from '../../app/classes';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup } from '@angular/forms';

/*
  Generated class for the AgencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgencesProvider {
  

    private database: SQLiteObject;
  initPromise: Promise<void>;
    constructor(public sqlite : SQLite) {
      this.initPromise = this.sqlite.create({
        name: 'test.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        console.log(db);
        this.database = db;
        return this.database.executeSql('CREATE TABLE IF NOT EXISTS rental_agency (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, code_agency TEXT)', [])
          .then(() => console.log('Table rental_agency created'))
          .catch(e => console.log('Error creating table rental_agency', e));
      });
    }
    
    addRentalAgency(rentalAgency: RentalAgency): Promise<any> {
      return this.initPromise.then(() => {
        return this.database.executeSql('INSERT INTO rental_agency (name, address, code_agency) VALUES (?, ?, ?)',
          [rentalAgency.name, rentalAgency.address, rentalAgency.code_agency]);
      });
    }
  
    
  
    getAllRentalAgencies(): Promise<RentalAgency[]> {
      return this.database.executeSql('SELECT * FROM rental_agency', []).then(data => {
        let rentalAgencies: RentalAgency[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            rentalAgencies.push(RentalAgency.fromObject(data.rows.item(i)));
          }
        }
        return rentalAgencies;
      });
    }
  
    getRentalAgencyById(id: number): Promise<RentalAgency> {
      return this.database.executeSql('SELECT * FROM rental_agency WHERE id = ?', [id]).then(data => {
        if (data.rows.length > 0) {
          return RentalAgency.fromObject(data.rows.item(0));
        } else {
          return null;
        }
      });
    }
  
    updateRentalAgency(rentalAgency: RentalAgency): Promise<any> {
      return this.database.executeSql('UPDATE rental_agency SET name = ?, address = ?, code_agency = ? WHERE id = ?',
        [rentalAgency.name, rentalAgency.address, rentalAgency.code_agency, rentalAgency.id]);
    }
  
    deleteRentalAgency(id: number): Promise<any> {
      return this.database.executeSql('DELETE FROM rental_agency WHERE id = ?', [id]);
    }
    async getFilteredAgencies(form: FormGroup): Promise<RentalAgency[]> {
      const db: SQLiteObject = await this.database;
      const query = `
        SELECT *
        FROM rental_agency
        WHERE name LIKE '%${form.value.name}%' AND address LIKE '%${form.value.address}%' AND code_agency LIKE '%${form.value.code_agency}%'
      `;
      const result = await db.executeSql(query, []);
      const agencies: RentalAgency[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        const agency = new RentalAgency(row.id, row.name, row.address, row.code_agency);
        agencies.push(agency);
      }
      return agencies;
    }
  }


