import { NgModule } from '@angular/core';
import { ReservationsComponent } from './reservations/reservations';
import { UploadComponent } from './upload/upload';
import { AdminUsersComponent } from './admin-users/admin-users';
import { ProfileComponent } from './profile/profile';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user';
import { EditUserComponent } from './edit-user/edit-user';
import { RouterModule} from '@angular/router';
import { NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicModule } from 'ionic-angular';
import { AdminReservationsComponent } from './admin-reservations/admin-reservations';
import { PagesUsersComponent } from './pages-users/pages-users';



// const routes:Routes =[]



@NgModule({
	declarations: [ReservationsComponent,
    UploadComponent,
    AdminUsersComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    AdminReservationsComponent,
    PagesUsersComponent,
    UploadComponent,],
	imports: [CommonModule,ReactiveFormsModule,NgxDatatableModule,IonicModule],
	exports: [ReservationsComponent,
    UploadComponent,
    AdminUsersComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    AdminReservationsComponent,
    PagesUsersComponent,
    UploadComponent],providers:[AuthService]
})
export class ComponentsModule {}
