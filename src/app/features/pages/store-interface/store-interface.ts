import { Component } from '@angular/core';
import { Header } from '../../../shared/layout/header/header';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HttpEvents } from '../../../core/services/http-events';
import { HttpAuth } from '../../../core/services/http-auth';


@Component({
  selector: 'app-store-interface',
  imports: [RouterOutlet, Header, RouterLink, ReactiveFormsModule],
  templateUrl: './store-interface.html',
  styleUrl: './store-interface.scss',
})
export class StoreInterface {

  showModal: boolean = false
  createEventForm!:FormGroup
  storeId!:string | undefined

  constructor(
    private httpEvents: HttpEvents,
    private httpAuth: HttpAuth
  ){

    this.createEventForm = new FormGroup({
    eventName:        new FormControl('', Validators.required),
    eventDescription: new FormControl('', Validators.required),
    date:             new FormControl('', Validators.required),
    time:             new FormControl('', Validators.required),
    location:         new FormControl('', Validators.required),
    category:         new FormControl('', Validators.required),
    status:           new FormControl('upcoming'),
    isPublic:         new FormControl(true)
})
  }

ngOnInit(){
      this.httpAuth.getId().subscribe({
      next: (data) => {
        this.storeId = data
      },
      error: (error) => {
        console.log(error);
      }
    })
}

openModal(){
    this.showModal = true
}

closeModal(){
    this.showModal = false
}

onSubmit(){
    this.httpEvents.createEvent(this.storeId, this.createEventForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
}
}
