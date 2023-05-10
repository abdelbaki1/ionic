import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inspection, Vehicle } from '../../app/classes';

/*
  Generated class for the InsceptionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InsceptionProvider {

  private database: SQLiteObject;
  private inspections: BehaviorSubject<Inspection[]> = new BehaviorSubject<Inspection[]>([]);

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      this.createTable();
      this.loadInitialData();
    });
  }

  private createTable() {
    this.database.executeSql(`CREATE TABLE IF NOT EXISTS inspections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      vehicle TEXT
      description TEXT
    );`, [])
    .then(() => console.log('Inspections table created'))
    .catch(err => console.error('Error creating inspections table', err));
  }

  private loadInitialData() {
    this.database.executeSql('SELECT * FROM inspections', [])
    .then(result => {
      const inspections = [];
      for (let i = 0; i < result.rows.length; i++) {
        const inspection = Inspection.fromObject(result.rows.item(i));
        inspections.push(inspection);
      }
      this.inspections.next(inspections);
    })
    .catch(err => console.error('Error loading inspections from database', err));
  }

  getInspections(): Observable<Inspection[]> {
    return this.inspections.asObservable();
  }

  addInspection(date: Date, vehicle: Vehicle,description : string) {
    const inspection = new Inspection(null, date, vehicle,description);
    const sql = 'INSERT INTO inspections (date, vehicle,description) VALUES (?, ?,?)';
    this.database.executeSql(sql, [inspection.date.toISOString(),vehicle.id,inspection.description])
    .then(result => {
      inspection.id = result.insertId;
      const currentInspections = this.inspections.getValue();
      currentInspections.push(inspection);
      this.inspections.next(currentInspections);
    })
    .catch(err => console.error('Error adding inspection to database', err));
  }

  updateInspection(inspection: Inspection) {
    const sql = 'UPDATE inspections SET date = ?, vehicle = ? WHERE id = ?';
    this.database.executeSql(sql, [inspection.date.toISOString(), JSON.stringify(inspection.vehicle), inspection.id])
    .then(() => {
      const currentInspections = this.inspections.getValue();
      const index = currentInspections.findIndex(i => i.id === inspection.id);
      currentInspections[index] = inspection;
      this.inspections.next(currentInspections);
    })
    .catch(err => console.error('Error updating inspection in database', err));
  }
  async deleteInspection(inspectionId: number): Promise<void> {
    try {
      await this.database.executeSql('DELETE FROM inspections WHERE id = ?', [inspectionId]);
    } catch (error) {
      console.error(`Unable to delete inspection with id ${inspectionId}:`, error);
      throw error;
    }
  }
  
}
