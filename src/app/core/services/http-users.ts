import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpAuth } from './http-auth';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpUsers {

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth
  ) { 
  }

  createUser(newUser: any):Observable<any>{
    return this.http.post("http://localhost:3000/users", newUser, { headers: this.httpAuth.getHeaders()})
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>("http://localhost:3000/users", { headers: this.httpAuth.getHeaders()}).pipe(
      map ((data)=>{
        data.getUsers
      }),
      tap ((data)=>{
        console.log(data)
      })
    )
  }

  getUserById(id: string | undefined):Observable<any>{
    return this.http.get(`http://localhost:3000/users/${id}`, { headers: this.httpAuth.getHeaders()})
  }

  deleteUser(id: string):Observable<any>{
    return this.http.delete(`http://localhost:3000/users/${id}`, { headers: this.httpAuth.getHeaders()}).pipe(
      tap ((data)=>{
        this.httpAuth.clearLocalStorageData()
      })
    )

  }
  
  updateUser(id: string | undefined, updatedData: any ):Observable<any>{

    console.log(id, updatedData)
    
    return this.http.patch(`http://localhost:3000/users/${id}`, updatedData, { headers: this.httpAuth.getHeaders()})
  }
  
}
