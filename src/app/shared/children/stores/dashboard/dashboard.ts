import { Component } from '@angular/core';
import { HttpEvents } from '../../../../core/services/http-events';
import { HttpAttendees } from '../../../../core/services/http-attendees';
import { HttpUsers } from '../../../../core/services/http-users';
import { HttpAuth } from '../../../../core/services/http-auth';
import { BehaviorSubject, firstValueFrom, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  id!: string | undefined;
  attendees!:any[]
  eventsByStore!:any[]

  constructor (
    public httpAttendee: HttpAttendees,
    public httpUser: HttpUsers,
    private httpAuth: HttpAuth,
    private httpEvents: HttpEvents
  ) {

  }

  ngOnInit(){
    this.httpAttendee.getAllAttendees().subscribe({
      next: data=>{
        return this.attendees=data},
      error: error=>console.error(error),
      complete:()=>{
        console.log(this.attendees)
      }
    })

    this.httpAuth.getId().subscribe({
      next: data=> {
        this.id=data;
        if (this.id) {
          this.httpUser.getUserById(this.id).subscribe({
            next: userData=> this.eventsByStore=userData.userById.events,
            error: error=>console.error(error),
            complete:()=>{
              console.log(this.eventsByStore)
            }
          });
        }
      },
      error: error=>console.error(error),
      complete:()=>{
        console.log(this.id)
      }
    });
  }

  deleteEvent(id:string){
    this.httpEvents.deleteEvent(id).subscribe({
      next: data=> console.log(data),
      error: error=>console.error(error),
      complete:()=>{
        console.log("Evento eliminado")
      }
    })
  }
}
