import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncidentsProvider } from '../../providers/incidents/incidents';
import { Incident } from '../../app/classes';

/**
 * Generated class for the IncidentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incidents',
  templateUrl: 'incidents.html',
})
export class IncidentsPage  {
  incidents : Incident[]

  constructor(public navCtrl: NavController, public navParams: NavParams,private incidentservice : IncidentsProvider) {
  }

  ionViewWillEnter() {
    this.incidentservice.getIncidents().subscribe((i)=>this.incidents=i)
    
  }

}
