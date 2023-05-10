import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';
import {Storage} from '@ionic/storage';
import { AddCarPage } from '../add-car/add-car';

/**
 * Generated class for the PageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-list',
  templateUrl: 'page-list.html',
})
export class PageListPage {
  @Input() name = 'page-list component'
  @Input() objects_list : any[] =[]
  @Input() columns: any[]
  @Output() detail_emitter : EventEmitter<any> = new EventEmitter()
  @Output() update_emitter :EventEmitter<any> = new EventEmitter()
  @Output() delete_emitter : EventEmitter<any> = new EventEmitter()
  @Output() add_emitter : EventEmitter<any> = new EventEmitter()
  @Output() onend : EventEmitter<any> = new EventEmitter()


  vehicles: any[];
  filteredVehicles: any[];
  selectedBrand: string;
  selectedSeats: number;
  selectedYear: number;
  brands: string[] = ['Toyota', 'Honda', 'Nissan', 'Ford'];
  seatOptions: number[] = [2, 4, 5, 7, 8];
  yearOptions: number[] = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];


  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  lastScrollTop: any = 0

  constructor(private storage: Storage,public nav: NavController, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    console.log(this.objects_list);
    
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
  items = [
    {
      id:'5',
      imageUrl: 'assets/img/bmw.jpg',
      title: 'bmv',
      place: 'bmv',
      date: '05/06/2016'
    },
    
  ];

  delete(item) {
    this.delete_emitter.emit(item.id)
    alert('Deleted ' + item.title);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    
  }
  to_add(){
    this.add_emitter.emit(0)
    
  }
  detail(id){
    this.detail_emitter.emit(id)

  }
  loadmore(event : InfiniteScroll){
    console.log('reaching the end');
    this.onend.emit(event)
    // event.complete()


  }



}
