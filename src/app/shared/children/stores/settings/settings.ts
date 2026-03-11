import { Component } from '@angular/core';
import { HttpUsers } from '../../../../core/services/http-users';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {

  editForm!:FormGroup

  constructor(
    public httpUsers: HttpUsers
  ){
    this.editForm = new FormGroup ({
          userName: new FormControl(""),
          email:new FormControl(""),
          phone:new FormControl(""),
          location:new FormControl(""),
          description:new FormControl("")
    })
  }

  onSubmit(){

  }

}
