import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { FormBuilder, Validators } from "@angular/forms";
import { UsersProvider } from "../../providers/users/users";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registrationForm: any;

  constructor(public nav: NavController,private formBuilder:FormBuilder,private userservice : UsersProvider) {
    this.registrationForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // register and go to home page
  register() {
    console.log('registraion');
    this.userservice.signUpUser(this.registrationForm.getRawValue())
    .then(()=>this.nav.setRoot(LoginPage))
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
