import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { HttpAuth } from './http-auth';

@Injectable({
  providedIn: 'root',
})
export class HttpEvents {

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth
  ){}

  FindAllEvents():Observable<any>{
    return this.http.get<any>("http://localhost:3000/events").pipe(
      tap ((data)=>console.log(data)),
      map ((data=>data.allEvents)),
      tap ((data)=>console.log(data)
    )
  )
  }

  editEvent(id: string, event: any):Observable<any>{
    return this.http.patch(`http://localhost:3000/events/${id}`, event)
  }

  createEvent(storeId: string | undefined, input: any):Observable<any>{
    return this.http.post(`http://localhost:3000/events/store/${storeId}`, input)
  }

  deleteEvent(id: string):Observable<any>{
    return this.http.delete(`http://localhost:3000/events/${id}`)
  }

  addAttendeetoEvent(eventId: string, userId: string | undefined):Observable<any>{
    return this.http.post(`http://localhost:3000/events/attendee/${eventId}`, {userId: userId},{ headers: this.httpAuth.getHeaders()})
  }
  
}
