import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {

}
