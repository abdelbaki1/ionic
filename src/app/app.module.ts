import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { IonicStorageModule } from "@ionic/storage";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { SQLite} from '@ionic-native/sqlite';
import { ActivityService } from "../services/activity-service";
import { TripService } from "../services/trip-service";
import { WeatherProvider } from "../services/weather";
import { MyApp } from "./app.component";
import { SettingsPage } from "../pages/settings/settings";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { NotificationsPage } from "../pages/notifications/notifications";
import { RegisterPage } from "../pages/register/register";
import { AccountPage } from "../pages/account/account";
import { IncidentsPage } from "../pages/incidents/incidents";
import { RentCarPage } from "../pages/rent-car/rent-car";
import { RentalsPage } from "../pages/rentals/rentals";
import { ReservationsPage } from "../pages/reservations/reservations";
import { HistoryPageModule } from "../pages/history/history.module";
import { ComponentsModule } from "../components/components.module";
import { AddIncidentPageModule } from "../pages/add-incident/add-incident.module";
import { CarDetailPageModule } from "../pages/car-detail/car-detail.module";
import { CarsPage } from "../pages/cars/cars";
import { PageListPage } from "../pages/page-list/page-list";
import { AddCarPage } from "../pages/add-car/add-car";
import { ReservationsListPageModule } from "../pages/reservations-list/reservations-list.module";
import { ReservationsListPage } from "../pages/reservations-list/reservations-list";
import { AdminReservationDetailPageModule } from "../pages/admin-reservation-detail/admin-reservation-detail.module";
import { AdminReservationDetailPage } from "../pages/admin-reservation-detail/admin-reservation-detail";
import { AdminVehicleTechnicalInspectionsPage } from "../pages/admin-vehicle-technical-inspections/admin-vehicle-technical-inspections";
import { UsersPage } from "../pages/users/users";
import { AssurencesPage } from "../pages/assurences/assurences";
import { DatabaseProvider } from '../providers/database/database';
import { CarsProvider } from '../providers/cars/cars';
import { ReservationsProvider } from '../providers/reservations/reservations';
import { IncidentsProvider } from '../providers/incidents/incidents';
import { UsersProvider } from '../providers/users/users';
import { AssurenceProvider } from '../providers/assurence/assurence';
import { InsceptionProvider } from '../providers/insception/insception';
import { DashboardPage } from "../pages/dashboard/dashboard";
import { CalendarModule } from 'ionic3-calendar-en';
import { AdminChangeCarPage } from "../pages/admin-change-car/admin-change-car";
import { AddInsurencePage } from "../pages/add-insurence/add-insurence";
import { AgencesPage } from "../pages/agences/agences";
import { DashboardClientPage } from "../pages/dashboard-client/dashboard-client";
import { AgencesProvider } from '../providers/agences/agences';
import { StatisticProvider } from '../providers/statistic/statistic';

// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    SettingsPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    AccountPage,
    IncidentsPage,
    RentCarPage,
    RentalsPage,
    ReservationsPage,
    CarsPage,
    UsersPage,
    PageListPage,
    AssurencesPage,
    AdminVehicleTechnicalInspectionsPage,
    AddCarPage,
    AdminChangeCarPage,
    AddInsurencePage,
    AgencesPage,DashboardClientPage

     // CarDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    HistoryPageModule,
    AddIncidentPageModule,
    CarDetailPageModule,
    ReservationsListPageModule,
    AdminReservationDetailPageModule,
    CalendarModule,

    
    // RouterModule.forRoot([{path:'',component:A}])
    IonicModule.forRoot(MyApp, {
      scrollPadding: true,
      scrollAssist: true,
      autoFocusAssist: false,
    }),
    IonicStorageModule.forRoot({
      name: "__ionic3_start_theme",
      driverOrder: ["indexeddb", "sqlite", "websql"],
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    AccountPage,
    IncidentsPage,
    RentCarPage,
    RentalsPage,
    ReservationsPage,
    CarsPage,
    AddCarPage,
    ReservationsListPage,
    AdminReservationDetailPage,
    AdminVehicleTechnicalInspectionsPage,
    UsersPage,
    AssurencesPage,
    DashboardPage,
    AdminChangeCarPage,
    AddInsurencePage,
    AgencesPage,DashboardClientPage,
    
    
  ],
  providers: [
    SQLite,
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider,
    CarsProvider,
    ReservationsProvider,
    IncidentsProvider,
    UsersProvider,
    AssurenceProvider,
    InsceptionProvider,
    AgencesProvider,
    StatisticProvider,
  ],
})
export class AppModule {}
