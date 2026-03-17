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
  selectedFile!: File

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

onFileChange(event: any){
    const file = event.target.files[0]
    if(file) this.selectedFile = file
}

onSubmit(){
    // this.httpEvents.createEvent(this.storeId, this.createEventForm.value).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
     if(this.createEventForm.invalid) return

    const formData = new FormData()

    Object.keys(this.createEventForm.value).forEach(key => {
      formData.append(key, this.createEventForm.value[key])
    })

    if(this.selectedFile) formData.append('eventImg', this.selectedFile) // 👈 agrega imagen

    this.httpEvents.createEvent(this.storeId, formData).subscribe({
      next: (response) => {
        console.log(response)
        this.closeModal()
      },
      error: (error) => console.log(error)
    })
}


}
