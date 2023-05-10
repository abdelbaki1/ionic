import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../env/env';
import { Auth } from '../../services/auth';
import { User } from '../../services/user';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {
  infoForm: FormGroup ;
  passwordForm: FormGroup;
  url_upload=`${environment.server_url}/upload`
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.infoForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      user_image:['',Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: ''
    });
    // Auth.userEmitter.subscribe(
    //   (user1:User) => {
    //     console.log("**************");
    //     this.infoForm?.patchValue(user1);

    //   },
    //   err=>console.log(err)
      
    // );
  }

  ngOnInit(): void {
    console.log(Auth.user,Auth.user_type);
  }
  get image(){
    if(this.infoForm)
    return this.infoForm.get('user_image').value;
    else return null
  }
  infoSubmit(): void {
    // console.log(this.infoForm.getRawValue());
    
    // this.authService.updateInfo(this.infoForm.getRawValue()).then(
    //   (user_obs)=>
    //     {if(!user_obs)Swal.fire('there was an error while changing','','error');
    //     else{
    //     user_obs.subscribe(
    //       {next:(user)=> {
    //         console.log(user);
    //         Swal.fire('USER DETAIL CHANGED','','info')
    //         Auth.user=user;
    //         Auth.userEmitter.emit(user);
    //         this.router.navigate(['/dashboard'])}}
    //       )
    //     }
      
    //   }
    // )
  }

  passwordSubmit(): void {
  //   this.authService.updatePassword(this.passwordForm.getRawValue())
  //   .then(
  //     (user_obs)=>
  //       {if(!user_obs)Swal.fire('there been an error while changing','','error');
  //       else{
  //       user_obs.subscribe(
  //         {next:(user)=> {
  //           Swal.fire('Password changed ','','info')
  //           Auth.userEmitter.emit(user);this.router.navigate(['/login'])}}
  //         )
  //       }
      
  //     }
  //   )
  }

}
