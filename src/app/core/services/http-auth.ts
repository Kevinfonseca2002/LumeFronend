import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Login } from '../interfaces/contracts/login';
import { Register } from '../interfaces/contracts/register';
import { LoginResponse } from '../interfaces/response/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpAuth {

  // 1. Espacio de memoria temporal donde se va a guardar la informacion
  private currentUser = new BehaviorSubject<null|Partial<Login>>(null);
  private currentToken = new BehaviorSubject<null|String>(null);

  // 2. Observable para los datos actuales y ver si cambian
  public currentUser$ = this.currentUser.asObservable()
  public currentToken$ = this.currentToken.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router
  ){}
  
  register(credentials:Register){
    return this.http.post('http://localhost:3000/users', credentials).
    pipe(
      catchError(error=> of ([]))
    )
  }

  login(credentials:Partial<Login>): Observable<Partial<LoginResponse>>{
  return this.http.post<Partial <LoginResponse>>('http://localhost:3000/auth', credentials).
    pipe(
      tap (data=>{
        if(data.token && data.user){
          this.currentToken.next(data.token)
          this.currentUser.next(data.user)
          this.saveLocalStorage(data.token, data.user)
          this.router.navigate(["feed"])
        }
      }),
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
