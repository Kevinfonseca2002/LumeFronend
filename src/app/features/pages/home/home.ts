import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(
    private router: Router
  ){}

  beginLogin(){
    this.router.navigate(["login"])
  }

  registerStore(){
    this.router.navigate(["register"])
  }

}
