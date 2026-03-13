import { Component } from '@angular/core';
import { HttpEvents } from '../../../../core/services/http-events';
import { HttpAttendees } from '../../../../core/services/http-attendees';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  attendees!:any[]

  constructor (
    public httpAttendee: HttpAttendees
  ) {

  }

  ngOnInit(){
    this.httpAttendee.getAllAttendees().subscribe({
      next: data=>{
        return this.attendees=data},
      error: error=>console.error(error)
    })
  }


}
