import { Component } from '@angular/core';
import { HttpEvents } from '../../../core/services/http-events';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'event-card',
  imports: [AsyncPipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  events: Observable<any[]> = new Observable<any[]>();
  events$: BehaviorSubject<void>= new BehaviorSubject<void>(undefined)


  constructor(
    private httpEvents: HttpEvents
  ){}
  
  ngOnInit(){
    this.events$.pipe(
      switchMap (()=>this.httpEvents.FindAllEvents())
    )
    console.log(this.events, this.events$)
  }

}
