import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../env/env';
import { Router } from '@angular/router';

/**
 * Generated class for the AddUserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-user',
  templateUrl: 'add-user.html'
})
export class AddUserComponent {

  form: FormGroup;
  roles= [];
  page_num: any;
  selectedCityId :string;

  constructor(
    private formBuilder: FormBuilder,
    // private roleService: RoleService,
    // private userService: UserService,
    private http : HttpClient
  ) {
  }
  get first_name() {
    return this.form.get('first_name');
    
  }
  
  get last_name() {
    return this.form.get('last_name');
  }
  get password()
  {
    return this.form.get('password')
  }
  get email() {
    return this.form.get('email');
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      role_id: '',
      password:['',[Validators.required]]
    }
    );
      }
 


  submit(): void {
    console.log(this.form.getRawValue(),this.form);
    // this.userService.create(this.form.getRawValue()).then((result_obs)=>{
    // if(result_obs){
    //     Swal.fire('user added successfully','','success');
    //     result_obs.subscribe(

    //       () => this.router.navigate(['/users']),
    //       (error:HttpErrorResponse) => {
    //         if(error.status == 403)
    //         {
    //           Swal.fire(error.statusText,error.error['detail'],'error')
    //       this.router.navigate(['/orders']);
    //         }
    //       })
    //     }
    // else{
    //       Swal.fire('there was an error while creating user object')
    //       this.router.navigate(['/users'])
    //     }
    //     }
          // );
  }

}
