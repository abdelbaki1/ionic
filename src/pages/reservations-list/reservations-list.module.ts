import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationsListPage } from './reservations-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReservationsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationsListPage),
    ComponentsModule
  ],
})
export class ReservationsListPageModule {}
