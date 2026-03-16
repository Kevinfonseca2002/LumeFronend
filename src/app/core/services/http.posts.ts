import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { HttpAuth } from './http-auth';

@Injectable({
  providedIn: 'root',
})
export class HttpPosts {

constructor(
  private http:HttpClient,
  private httpAuth: HttpAuth
){}

createPost(input:any):Observable<any>{
  return this.http.post<any>("http://localhost:3000/posts",input, { headers: this.httpAuth.getHeaders() })
}

findAllPost():Observable<any>{
  return this.http.get<any>("http://localhost:3000/posts", { headers: this.httpAuth.getHeaders() }).pipe(
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
  return this.http.delete(`http://localhost:3000/posts${id}`, { headers: this.httpAuth.getHeaders() })
}

patchPost(id:string, updatedData: any):Observable<any>{
  return this.http.patch<any>(`http://localhost:3000/posts${id}`, updatedData, { headers: this.httpAuth.getHeaders() }).pipe(
    map ((data)=>{data.PostById}),
    tap ((data)=>{
      console.log(data)
      return data})
  )
}

getPostsByUser(userId: string): Observable<any> {
    return this.http.get(
        `http://localhost:3000/posts/user/${userId}`,
        { headers: this.httpAuth.getHeaders() }
    )
}
  
}
