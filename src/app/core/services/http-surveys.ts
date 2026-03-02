import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpSurveys {

  constructor(
    private http: HttpClient
  ){}
  
  createSurvey(){
    this.http.post()
  }

}
