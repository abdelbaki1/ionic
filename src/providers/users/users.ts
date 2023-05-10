import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { User } from "../../app/classes";

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  private database: SQLiteObject;
  initPromise: Promise<void>;

  constructor(public sqlite: SQLite) {
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
            "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT,password TEXT , last_name TEXT, address TEXT, phone TEXT, img TEXT)",
            []
          )
          .then(() => console.log("Table user created"))
          .catch((e) => console.log("Error creating table user", e));
      });
  }

  async updateUser(user: User): Promise<any> {
    const db: SQLiteObject = await this.database;
    return db.executeSql(
      "UPDATE user SET first_name = ?, last_name = ?, address = ?, phone = ?, img = ? WHERE id = ?",
      [
        user.first_name,
        user.last_name,
        user.address,
        user.phone,
        user.img,
        user.id,
      ]
    );
  }

  async getUserById(id: string): Promise<User> {
    const db: SQLiteObject = await this.database;
    const data = await db.executeSql("SELECT * FROM user WHERE id = ?", [id]);
    if (data.rows.length > 0) {
      const row = data.rows.item(0);
      return new User(
        row.id,
        row.first_name,
        row.last_name,
        row.address,
        row.phone,
        row.img
      );
    } else {
      return null;
    }
  }

  async loginUser(user: User): Promise<User> {
    return this.initPromise.then(() => {
      return this.database.executeSql('SELECT * FROM user WHERE password = ?', [user.password]).then((data) => {
        console.log(data);
        
        if (data.rows.length > 0) {
          return User.fromObject(data.rows.item(0));
        } else {
          return null;
        }
      });
    });
  }

  async signUpUser(user: User): Promise<any> {
        user.last_name=''
        user.address=''
        user.phone=''
        user.img=''
        console.log(user);
        
    return this.initPromise.then(()=> {return this.database.executeSql(
      "INSERT INTO user (first_name,password, last_name, address, phone, img) VALUES (?,?, ?, ?, ?, ?)",
      [

        user.first_name,
        user.password,
        user.last_name,
        user.address,
        user.phone,
        user.img,
      ]
    )});
  }
}
