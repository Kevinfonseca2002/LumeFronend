import { Component } from '@angular/core';
import { LoginForm } from '../../../shared/layout/login-form/login-form';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

constructor(
  private router: Router
) {}

returnHome(){
  this.router.navigate(['/home'])

}
}