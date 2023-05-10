import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { Incident } from '../../app/classes';

/*
  Generated class for the IncidentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IncidentsProvider {
  private database: SQLiteObject;
  private incidentList: BehaviorSubject<Incident[]> = new BehaviorSubject([]);

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'incident.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS incidents(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, description TEXT)', []);
        this.loadIncidents();
      });
    });
  }

  private loadIncidents() {
    return this.database.executeSql('SELECT * FROM incidents ORDER BY id DESC', []).then(data => {
      let incidents: Incident[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          incidents.push({
            id: data.rows.item(i).id,
            date: new Date(data.rows.item(i).date),
            description: data.rows.item(i).description
          });
        }
      }

      this.incidentList.next(incidents);
    });
  }

  getIncidents() {
    return this.incidentList.asObservable();
  }

  addIncident(incident: Incident) {
    let data = [incident.date.toISOString(), incident.description];

    return this.database.executeSql('INSERT INTO incidents (date, description) VALUES (?,?)', data).then(res => {
      this.loadIncidents();
    });
  }

  deleteIncident(incident: Incident) {
    return this.database.executeSql('DELETE FROM incidents WHERE id=?', [incident.id]).then(res => {
      this.loadIncidents();
    });
  }
}
