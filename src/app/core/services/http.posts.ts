import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpPosts {

constructor(
  private http:HttpClient
){}

createPost(input:any):Observable<any>{
  return this.http.post<any>("http://localhost:3000/posts",input)
}

findAllPost():Observable<any>{
  return this.http.get<any>("http://localhost:3000/posts").pipe(
    // tap( data => {
    //   console.log(data)
    // }),
    map ((data)=> data.allPosts),
    // tap ((data)=>{
    //   console.log(data)

    // })
  )
}

deletePost(id:string | null):Observable<any>{
  return this.http.delete(`http://localhost:3000/posts${id}`)
}

patchPost(id:string, updatedData: any):Observable<any>{
  return this.http.patch<any>(`http://localhost:3000/posts${id}`, updatedData).pipe(
    map ((data)=>{data.PostById}),
    tap ((data)=>{
      console.log(data)
      return data})
  )
}
  
}
