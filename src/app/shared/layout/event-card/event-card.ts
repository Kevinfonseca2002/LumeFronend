import { Component } from '@angular/core';
import { HttpEvents } from '../../../core/services/http-events';
import { DatePipe } from '@angular/common';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'event-card',
  imports: [DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  events!: any[]
  userId: string | undefined

  constructor(
    private httpEvents: HttpEvents,
    private httpAuth: HttpAuth
    
  ){}
  
  ngOnInit(){
    this.httpEvents.FindAllEvents().subscribe({
      next:(data)=>this.events=data
    })
    this.httpAuth.getId().subscribe({
      next: (data) => {
        this.userId = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  addAttendee(eventId: string){
    // return console.log(this.userId)
    if(this.userId){
      // return console.log(this.userId)
    this.httpEvents.addAttendeetoEvent(eventId, this.userId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  }

}
