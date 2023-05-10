import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  ToastController,
  MenuController,
} from "ionic-angular";
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DashboardPage } from "../dashboard/dashboard";
import { UsersProvider } from "../../providers/users/users";
import { AuthService } from "../../services/auth.service";
import { DashboardClientPage } from "../dashboard-client/dashboard-client";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private userservice: UsersProvider
  ) {
    this.loginForm = this.formBuilder.group({
      first_name: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    console.log(this.loginForm.getRawValue());

    this.userservice.loginUser(this.loginForm.getRawValue()).then((u) => {
      if (u) {
        console.log(u);
        
        localStorage.setItem('id',u.id)
        if (u.first_name == 'admin')
            {localStorage.setItem('admin','true')
            this.nav.setRoot(DashboardPage);
          
          
          }
        else 
            {localStorage.setItem('admin','false')
            this.nav.setRoot(DashboardClientPage);
          }
        console.log("wellcom", u.id);
        // this.nav.setRoot(DashboardPage);
      }
      else{
        alert('no user found , are u sure u have sign-in')
      }
    });
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: "Forgot Password?",
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: "email",
          placeholder: "Email",
          type: "email",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Send",
          handler: (data) => {
            console.log("Send clicked");
            let toast = this.toastCtrl.create({
              message: "Email was sended successfully",
              duration: 3000,
              position: "top",
              cssClass: "dark-trans",
              closeButtonText: "OK",
              showCloseButton: true,
            });
            toast.present();
          },
        },
      ],
    });
    forgot.present();
  }
}
