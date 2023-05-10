import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAgencePage } from './add-agence';

@NgModule({
  declarations: [
    AddAgencePage,
  ],
  imports: [
    IonicPageModule.forChild(AddAgencePage),
  ],
})
export class AddAgencePageModule {}
