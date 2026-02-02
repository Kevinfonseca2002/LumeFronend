import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpUsers {

  constructor(private http: HttpClient) { 
  }

  createUser(newUser: any){
    return this.http.post("http://localhost:3000/users", newUser)
  }
  
}
