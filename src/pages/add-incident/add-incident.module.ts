import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddIncidentPage } from './add-incident';

@NgModule({
  declarations: [
    AddIncidentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddIncidentPage),
  ],
})
export class AddIncidentPageModule {}
