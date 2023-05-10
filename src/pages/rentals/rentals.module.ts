import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalsPage } from './rentals';
import { PageListPageModule } from '../page-list/page-list.module';
import { PageListPage } from '../page-list/page-list';

@NgModule({
  declarations: [
    RentalsPage,PageListPage
  ],
  imports: [PageListPageModule,
    IonicPageModule.forChild(RentalsPage),
  ],
})
export class RentalsPageModule {}
