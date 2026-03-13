import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpAuth } from './http-auth';

@Injectable({
  providedIn: 'root',
})
export class HttpAttendees {

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth
  ){}

  getAllAttendees():Observable<any>{
    return this.http.get<any>("http://localhost:3000/attendee",).pipe(
      tap ((data)=>console.log(data)),
      map ((data)=>data.attendee)
    )
  }

}
