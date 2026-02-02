import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpUsers } from '../../../../core/services/http-users';

@Component({
  selector: 'app-user-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-new-form.html',
  styleUrl: './user-new-form.scss',
})
export class UserNewForm {

  userNewForm!: FormGroup ;

  constructor(
    public httpUser: HttpUsers
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
    if (this.userNewForm.valid){
      console.log(this.userNewForm.value)

      this.httpUser.createUser(this.userNewForm.value).subscribe({
        next: (data) => {
          console.log(data)        
        },
        error: (err) => {
          console.error(err)
        },
        complete: ()=>{
          this.userNewForm.reset()
        }

      // console.group( 'Estados del formulario' );
      // console.log( 'Valid:', this.formCategory.valid );
      // console.log( 'Invalid:', this.formCategory.invalid );
      // console.log( 'Pristine:', this.formCategory.pristine );
      // console.log( 'Dirty:', this.formCategory.dirty );
      // console.log( 'Touched:', this.formCategory.touched );
      // console.log( 'Untouched:', this.formCategory.untouched );
      // console.groupEnd();
      })
    }
    else {
      console.log('Invalid Form')
    }



  }

}
