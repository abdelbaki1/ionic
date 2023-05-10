import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {}

  create_db() {
    this.sqlite.create({
      name: 'test.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      // Use the SQLiteObject instance to execute SQL queries
      console.log("hello test  database");
      
    })
    .catch((error) => {
      console.error('Unable to 1create database', error);
    });
  }

}
