import { Component } from '@angular/core';

/**
 * Generated class for the PagesUsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pages-users',
  templateUrl: 'pages-users.html'
})
export class PagesUsersComponent {

  text: string;

  constructor() {
    console.log('Hello PagesUsersComponent Component');
    this.text = 'Hello World';
  }

}
