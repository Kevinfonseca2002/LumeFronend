import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpSurveys {
 
  constructor(
    private http: HttpClient
  ){}
  
  createSurvey(input: any):Observable<any>{
   return this.http.post<any>("http://localhost:3000/surveys",input)
  }

  deleteSurvey(id:string):Observable<any>{
  return this.http.delete(`http://localhost:3000/surveys ${id}`)

  }

  patchSurvey(id:string, input:any):Observable<any>{
    return this.http.patch<any>(`http://localhost:3000/surveys ${id}`, input).pipe(
      map ((data)=>{
        data.survey
      }),
      tap ((data)=>{
        console.log(data)
        return data
      })
    )
  }

  allSurveys():Observable<any>{
    return this.http.get<any>(`http://localhost:3000/surveys`).pipe(
      map ((data)=>{
        data.surveys
      }),
      tap ((data)=>{
        console.log(data)
        return data
      })
    )
  }

  getSurveyById(id:string):Observable<any>{
   return this.http.get<any>(`http://localhost:3000/surveys ${id}`).pipe(
      map ((data)=>{
        data.survey
      }),
      tap ((data)=>{
        console.log(data)
        return data
      })
    )
  }



}
