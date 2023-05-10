import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncidentsPage } from './incidents';
import { ComponentsModule } from '../../components/components.module';
import { PageListPageModule } from '../page-list/page-list.module';
import { PageListPage } from '../page-list/page-list';


@NgModule({
  declarations: [
    IncidentsPage,PageListPage
  ],
  imports: [
    IonicPageModule.forChild(IncidentsPage),
  ],
})
export class IncidentsPageModule { }
