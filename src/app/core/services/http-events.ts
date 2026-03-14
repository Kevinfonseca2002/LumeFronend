import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpEvents {

  constructor(
    private http: HttpClient
  ){}

  FindAllEvents():Observable<any>{
    return this.http.get<any>("http://localhost:3000/events").pipe(
      tap ((data)=>console.log(data)),
      map ((data=>data.allEvents)),
      tap ((data)=>console.log(data)
    )
  )
  }

  deleteEvent(id: string):Observable<any>{
    return this.http.delete(`http://localhost:3000/events/${id}`)
  }
  
}
