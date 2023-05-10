import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentCarPage } from './rent-car';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RentCarPage,
  ],
  imports: [
    IonicPageModule.forChild(RentCarPage),
    ComponentsModule
  ],
})
export class RentCarPageModule {}
