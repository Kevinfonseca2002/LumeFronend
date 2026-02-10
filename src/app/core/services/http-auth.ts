import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { Login } from '../interfaces/contracts/login';
import { Register } from '../interfaces/contracts/register';
import { LoginResponse } from '../interfaces/response/login-response';

@Injectable({
  providedIn: 'root',
})
export class HttpAuth {

  private currentUser = new BehaviorSubject<null|Partial<Login>>(null);
  // private currentUser = new BehaviorSubject<null|Partial<Login>>(null)

  constructor(
    private http: HttpClient
  ){}
  
  register(credentials:Register){
    return this.http.post('http://localhost:3000/users', credentials).
    pipe(
      catchError(error=> of ([]))
    )
  }
  login(credentials:{email:String; password: string}){
  return this.http.post<LoginResponse>('http://localhost:3000/auth', credentials).
    pipe(
      catchError(error=> of ([]))
    )
  }
  saveLocalStorage(token: string,  userData: any){
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
