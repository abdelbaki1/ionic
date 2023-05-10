import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { PageListPage } from '../page-list/page-list';
import { P } from '@angular/core/src/render3';
import { PageListPageModule } from '../page-list/page-list.module';

@NgModule({
  declarations: [
    HistoryPage
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
  ],
})
export class HistoryPageModule {}
