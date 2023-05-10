import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationsPage } from './reservations';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReservationsPage
  ],
  imports: [
    IonicPageModule.forChild(ReservationsPage),
    ComponentsModule
  ],
})
export class ReservationsPageModule {}
