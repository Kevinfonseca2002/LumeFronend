import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Login } from '../interfaces/contracts/login';
import { Register } from '../interfaces/contracts/register';
import { LoginResponse } from '../interfaces/response/login-response';
import { Router } from '@angular/router';
import { Users } from '../interfaces/contracts/users';
import { RegisterResponse } from '../interfaces/response/register-response';

@Injectable({
  providedIn: 'root',
})
export class HttpAuth {

  // 1. Espacio de memoria temporal donde se va a guardar la informacion
  private currentUser = new BehaviorSubject<null|Partial<Users>>(null);
  private currentToken = new BehaviorSubject<null|String>(null);

  // 2. Observable para los datos actuales y ver si cambian
  public currentUser$ = this.currentUser.asObservable()
  public currentToken$ = this.currentToken.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.getLocalStorageData()
  }
  
  register(credentials:Register):Observable<undefined | never[] | Partial<Register>>{
    return this.http.post<Partial<RegisterResponse>>('http://localhost:3000/auth/register', credentials).
      pipe(
        tap (data => console.log(data)),
        map (data => data.newUser),
        catchError(error=> of ([]))
      )
  }

  login(credentials:Partial<Login>): Observable<never[] | Partial<LoginResponse>> {
    return this.http.post<Partial<LoginResponse>>('http://localhost:3000/auth/login', credentials)
      .pipe(
        tap (data=>{
          if(data.token && data.user){
            this.currentToken.next(data.token)
            this.currentUser.next(data.user)
            this.saveLocalStorage(data.token, data.user)

           if(data?.user?.role == "store"){
            this.router.navigate(["/admin/dashboard"])
            return true
           } 
           else if(data?.user?.role == "user"){
            this.router.navigate(["/feed/main"])
            return true
           }
           else {
            this.clearLocalStorageData()
            this.router.navigate(["home"])
            return false
           }
          }
          return false
        }),
        catchError(error=> of ([]))
      )
  }
  
  saveLocalStorage(token: string,  userData: any){
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    this.currentToken.next(token)
    this.currentUser.next(userData)
  }

  getLocalStorageData(){
    const token = localStorage.getItem("token")
    this.currentToken.next(token ? token : null)

    const user= localStorage.getItem("user")
    this.currentUser.next(user ? JSON.parse(user): null)
    

    return {
      token,
      user
    }
  }

  clearLocalStorageData(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.currentToken.next(null)
    this.currentUser.next(null)
  }

  
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.currentToken.next(null)
    this.currentUser.next(null)
  }

  checkAuthStatus():Observable<boolean>{
    //Paso 1: Ver si el token esta en el local storage y obtenerlo (responder al cliente si no existe)
    //Desestructurar los datos obtenidos del local 
    const {token}= this.getLocalStorageData()

    if(!token){
      this.clearLocalStorageData()
      return of (false)
    }

    //Paso 2: Obtener el Token del encabezado enviado por el Backend
    const headers = new HttpHeaders().set("Authorization",token)

    //Paso 3: Realizar una solicitud al backend para validar el token (Renew Token)
    return this.http.get<any>('http://localhost:3000/auth/renew-token', {headers})
    .pipe(
      tap((response)=>{
        console.log(response)
      }),
      map((response)=>{
        if(!response || !response.token ){
          return false
        }
        this.saveLocalStorage(response.token, response.user)
        return true;
      }),
      catchError((error)=>{
        console.error(`ERROR:`,error)
        return of(false)
      })
    )
  }

  getHeaders():any{
    const {token}= this.getLocalStorageData()

    if(!token){
      this.clearLocalStorageData()
      return of (false)
    }
    const headers = new HttpHeaders().set("Authorization",token)
    return headers;
  }  

  getRole(){
    return this.currentUser$.pipe(
      tap ((data=>console.log(data))),
      map ((data=> data?.role))
    )
  }
}
