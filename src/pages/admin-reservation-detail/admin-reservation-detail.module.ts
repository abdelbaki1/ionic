import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminReservationDetailPage } from './admin-reservation-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdminReservationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminReservationDetailPage),
    ComponentsModule
  ],
})
export class AdminReservationDetailPageModule {}
