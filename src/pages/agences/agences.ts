import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RentalAgency } from '../../app/classes';
import { AgencesProvider } from '../../providers/agences/agences';
import { AddAgencePage } from '../add-agence/add-agence';
import { FormBuilder } from '@angular/forms';

/**
 * Generated class for the AgencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-agences',
  templateUrl: 'agences.html',
})
export class AgencesPage {

  constructor(private formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams,private agencyservice : AgencesProvider) {
  }

  agencies: RentalAgency[] = [];
  selectedCode: string;
  selectedName: string;
  selectedAddress: string;
  searchTerm: string;
  agencyForm = this.formBuilder.group({
    name: '',
    address: '',
    code_agency: ''
  });


  loadAgencies() {
    // Load agencies from service
    this.agencyservice.getAllRentalAgencies().then((a)=>this.agencies=a)
  }

  detail_agency(id) {
    this.navCtrl.push(AddAgencePage,{'id':id})
  }

  to_add_agency() {
    this.navCtrl.push(AddAgencePage)
    // Handle add agency event
  }

  delete_agency(id: number) {
    this.agencyservice.deleteRentalAgency(id).then(()=>this.loadAgencies())
  }

  applyFilters() {
    // Handle apply filters event
    this.agencyservice.getFilteredAgencies(this.agencyForm).then((a)=>this.agencies=a)
  }

}
