import { Component } from '@angular/core';

/**
 * Generated class for the AdminUsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'admin-users',
  templateUrl: 'admin-users.html'
})
export class AdminUsersComponent {

  text: string;

  constructor() {
    console.log('Hello AdminUsersComponent Component');
    this.text = 'Hello World';
  }

}
