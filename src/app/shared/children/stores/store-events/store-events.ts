import { Component } from '@angular/core';
import { HttpEvents } from '../../../../core/services/http-events';
import { HttpUsers } from '../../../../core/services/http-users';
import { HttpAuth } from '../../../../core/services/http-auth';
import { DatePipe } from '@angular/common';
import { FormGroup,ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-store-events',
  imports: [DatePipe,ReactiveFormsModule],
  templateUrl: './store-events.html',
  styleUrl: './store-events.scss',
})
export class StoreEvents {

  events!: any[];
  storeId!:string | undefined
  filteredEvents!: any[]
  activeFilter!: string
  eventEditForm!: FormGroup
  selectedEventId: string | null = null

  constructor(
    public httpUser: HttpUsers,
    private httpAuth: HttpAuth,
    private httpEvent: HttpEvents
  ){
    this.eventEditForm=new FormGroup({
      eventName:new FormControl(''),
      date:new FormControl(''),
      status:new FormControl(''),
    })
  }

  ngOnInit(){
    this.httpAuth.getId().subscribe({
      next:(data)=>{
        this.storeId=data;
        if(this.storeId){
          this.httpUser.getUserById(this.storeId).subscribe({
            next: (data)=>{
              this.events=data.userById.events
              this.filterEvents('upcoming')},
            error:(err)=>console.error(err),
            complete:()=>console.log(this.storeId,this.events)
          })
        }
      
      },
      error:(err)=>console.error(err)
    })
    

  }

    filterEvents(status: string): void {
    this.activeFilter = status
    if (status === 'all') {
      this.filteredEvents = this.events
    } else {
      this.filteredEvents = this.events.filter(event => event.status === status)
    }
  }

  onSubmit(){
    if(!this.selectedEventId) return
    this.httpEvent.editEvent(this.selectedEventId, this.eventEditForm.value).subscribe({
      next:(data)=>console.log(data),
      error:(err)=>console.error(err)
    })
    }
  deleteEvent(eventId: string){
    
  }

  editFormToggle(event: any){
    this.selectedEventId = event._id
    this.eventEditForm.patchValue({
      eventName: event.eventName,
      date: event.date,
      status: event.status
    })
  }

  cancelEdit(){
    this.selectedEventId = null 
    this.eventEditForm.reset()
  }


}
