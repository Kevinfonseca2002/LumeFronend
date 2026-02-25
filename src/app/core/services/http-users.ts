import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpAuth } from './http-auth';

@Injectable({
  providedIn: 'root',
})
export class HttpUsers {

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth
  ) { 
  }

  createUser(newUser: any){
    return this.http.post("http://localhost:3000/users", newUser, { headers: this.httpAuth.getHeaders()})
  }

  getAllUsers(){
    return this.http.get("http://localhost:3000/users", { headers: this.httpAuth.getHeaders()})
  }

  getUserById(id: string){
    return this.http.get(`http://localhost:3000/users/${id}`, { headers: this.httpAuth.getHeaders()})
  }

  deleteUser(id: string){
    return this.http.delete(`http://localhost:3000/users/${id}`, { headers: this.httpAuth.getHeaders()})
  }
  
  updateUser(id: string, updatedData: any){
    return this.http.put(`http://localhost:3000/users/${id}`, updatedData, { headers: this.httpAuth.getHeaders()})
  }
  
}
