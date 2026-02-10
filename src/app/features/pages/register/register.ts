import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpAuth } from '../../../core/services/http-auth';
import { RegisterStore } from '../../../shared/layout/register.store/register.store';
import { RegisterUser } from '../../../shared/layout/register.user/register.user';
import { Header } from '../../../shared/layout/header/header';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RegisterStore, RegisterUser, Header],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  store: boolean = false
  formData!:FormGroup


  constructor(
    private httpAuth: HttpAuth
  ){
    this.formData= new FormGroup({
      role: new FormControl("user"),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      phone: new FormControl(0, [Validators.required]),
      location: new FormControl("",[Validators.required]),
      description: new FormControl("", [Validators.required]),
      facebookLink: new FormControl(""),
      instagramLink: new FormControl(""),
      xLink: new FormControl(""),
      tiktokLink: new FormControl("")
    })

  }


  storeForm(){
    this.store=true
    this.formData.setValue({role:"store"})
    
  }
  userForm(){
    this.store=false
    this.formData.setValue({role:"user"})
  }
  onSubmit(){
    if(this.formData.valid){
    this.httpAuth.register(this.formData.value).
    subscribe({
      next: (response)=> console.log(`Signed up successfully`,response),
      error: (error) => console.error('Error signing you up, please try again', error),
      complete: () => this.formData.reset()
    })
    console.log(this.formData.value)
    }
  }  
}
