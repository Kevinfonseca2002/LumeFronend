import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {

  formData!:FormGroup

  constructor(
    private httpAuth: HttpAuth,
    private router: Router
  ){
    this.formData = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }

  onSubmit(){

    if(this.formData.valid){
    this.httpAuth.login(this.formData.value).subscribe({
      next: data => {console.log('Login Succesful', data);

        if (data.token && data.user){
          this.httpAuth.saveLocalStorage(data.token, data.user)
          this.router.navigate(['/'])
        }
      this.formData.reset();
      },
      error: error => console.log('There was an error during the login', error),
      complete: ()=>console.log('Login request completed')
    })}
    else{
      console.log("Form is invalid")
      this.formData.markAllAsTouched()
    }
  }

  onReset(){
    this.formData.reset();
    this.formData.markAsPristine()
  }

}
