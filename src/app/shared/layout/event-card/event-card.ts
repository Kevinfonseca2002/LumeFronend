import { Component } from '@angular/core';
import { HttpEvents } from '../../../core/services/http-events';
import { DatePipe } from '@angular/common';
import { HttpAuth } from '../../../core/services/http-auth';
import { take } from 'rxjs';
import { HttpUsers } from '../../../core/services/http-users';

@Component({
  selector: 'event-card',
  imports: [DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard {
  events!: any[]
  filteredEvents: any[] = []
  registeredEvents: any[] = []
  activeFilter: string = 'all'
  userId: string | undefined

  constructor(
    private httpEvents: HttpEvents,
    private httpAuth: HttpAuth,
    private httpUsers: HttpUsers

  ) { }

  ngOnInit() {
    this.httpEvents.FindAllEvents().subscribe({
      next: (data) => {
        this.events = data
        this.filteredEvents = data
      }
    })
    // this.httpAuth.getId().pipe(take(1)).subscribe({
    //   next: (data) => this.userId = data,

    //   error: (error) => console.log(error)
    // })
    this.httpAuth.getId().pipe(take(1)).subscribe({
      next: (id) => {
        this.userId = id
        if (id) {
          // 👇 trae los eventos registrados del usuario
          this.httpUsers.getRegisteredEvents(id).subscribe({
            next: (data) => this.registeredEvents = data.registeredEvents,
            error: (err) => console.error(err)
          })
        }
      },
      error: (error) => console.log(error)
    })
  }

  filterEvents(filter: string): void {
    this.activeFilter = filter

    if (filter === 'all') {
      this.filteredEvents = this.events
    } else if (filter === 'registered') {
      const registeredIds = this.registeredEvents.map(e => e._id)
      this.filteredEvents = this.events.filter(event =>
        registeredIds.includes(event._id)
      )
    }
  }

  addAttendee(eventId: string) {
    if (this.userId) {

      this.httpEvents.addAttendeetoEvent(eventId, this.userId).subscribe({
        next: (data) => {
          console.log('Attendee agregado:', data)
          this.httpUsers.addRegisteredEvent(this.userId!, eventId).subscribe({
            next: (data) => {
              console.log('Evento registrado en perfil:', data)
              this.httpUsers.getRegisteredEvents(this.userId!).subscribe({
                next: (data) => this.registeredEvents = data.registeredEvents,
                error: (error) => console.log(error)
              })
            },
            error: (error) => console.log(error)
          })
        },
        error: (error) => console.log(error)
      })
    }
  }

}
