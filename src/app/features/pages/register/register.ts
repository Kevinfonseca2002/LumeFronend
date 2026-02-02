import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  store: boolean = false


  constructor(){}


  storeForm(){
    this.store=true
  }
}
