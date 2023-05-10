import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, NavController } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { LoginPage } from "../pages/login/login";
import { ReservationsPage } from "../pages/reservations/reservations";
import { RentCarPage } from "../pages/rent-car/rent-car";
import { IncidentsPage } from "../pages/incidents/incidents";
import { AccountPage } from "../pages/account/account";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { AddIncidentPage } from "../pages/add-incident/add-incident";
import { CarsPage } from "../pages/cars/cars";
import { ReservationsListPage } from "../pages/reservations-list/reservations-list";
import { AssurencesPage } from "../pages/assurences/assurences";
import { AgencesPage } from "../pages/agences/agences";
import { DashboardClientPage } from "../pages/dashboard-client/dashboard-client";
import { DatabaseProvider } from "../providers/database/database";
import { CarsProvider } from "../providers/cars/cars";
import { AgencesProvider } from "../providers/agences/agences";
import { RentalAgency } from "./classes";
import { InsceptionProvider } from "../providers/insception/insception";
import { AssurenceProvider } from "../providers/assurence/assurence";
import { ReservationsProvider } from "../providers/reservations/reservations";
import { IncidentsProvider } from "../providers/incidents/incidents";
import { UsersProvider } from "../providers/users/users";
export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  admin : string
  rootPage: any = LoginPage;
  userMenuItems: Array<MenuItem>;
  account_link = { title: 'account', component: AccountPage, icon: 'help-circle' }
  adminMenuItems: Array<MenuItem>;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public db_service : DatabaseProvider,
    public agenceservice : AgencesProvider,
    public carservice : CarsProvider,
    public insception : InsceptionProvider,
    public assurence : AssurenceProvider,
    public reservation : ReservationsProvider,
    public incidentsservice : IncidentsProvider,
    public authservice : UsersProvider



    ) {
    this.initializeApp();
    this.adminMenuItems=[
   
      { title: 'Dashboard', component: DashboardPage, icon: 'home' },
      { title: 'Cars', component: CarsPage, icon: 'car' },
      { title: 'Reservations', component: ReservationsListPage, icon: 'clock' },
      { title: 'Agneces', component: AgencesPage, icon: 'people' },
      { title: 'Incidents', component: IncidentsPage, icon: 'archive' },
      { title: 'Insurences', component: AssurencesPage, icon: 'help-circle' },
      { title: 'profile', component: AccountPage, icon: 'person' },
      // { title: 'vehicle technical inspections', component: AdminVehicleTechnicalInspectionsPage, icon: 'calendar' },




    ]
    this.userMenuItems = [
      { title: 'Dashboard', component: DashboardClientPage, icon: 'home' },
      { title: 'Reservations', component: ReservationsPage, icon: 'clock' },
      { title: 'rent a car ', component: RentCarPage, icon: 'car' },
      { title: 'report an incident', component: AddIncidentPage, icon: 'help-circle' },
      

    ];
  }
  isAdmin(){
    return localStorage.getItem('admin') == 'true'

  }
  
  initializeApp() {  
    this.platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      // this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    console.log("page=",this.nav.getActive().name)
    this.rootPage = page.component
    // this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

}
