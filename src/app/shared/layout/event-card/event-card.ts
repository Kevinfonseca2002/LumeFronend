import { Component } from '@angular/core';
import { HttpEvents } from '../../../core/services/http-events';
// import { BehaviorSubject, Observable, switchMap } from 'rxjs';
// import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'event-card',
  imports: [],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  events!: any[]

  constructor(
    private httpEvents: HttpEvents
  ){}
  
  ngOnInit(){
    this.httpEvents.FindAllEvents().subscribe({
      next:(data)=>this.events=data
    })
  }

  prueba(){
    console.log(this.events)
  }

}
