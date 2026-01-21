import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-new-form.html',
  styleUrl: './user-new-form.scss',
})
export class UserNewForm {

  userNewForm!: FormGroup ;

  constructor(
  ){
    this.userNewForm = new FormGroup({

      name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      phone: new FormControl("",[Validators.required]),
      location: new FormControl("",[Validators.required]),
      description: new FormControl("",)

      
    })
  }

  onSubmit(){

  }

}
