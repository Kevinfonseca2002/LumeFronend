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

createPost(input:any):Observable<never[] | any>{
  this.http.post("http://localhost:3000/posts",input).pipe(
    map (data)=>{data.PostById}
    tap (data)=>{console.log(data)},
  )
}

findAllPost(){
  this.http.get("http://localhost:3000/posts").pipe(
    map (data)=>{data.allPosts}
    tap (data)=>{console.log(data)}
  )
}

deletePost(id:string | null){
  this.http.delete(`http://localhost:3000/posts${id}`)
}

patchPost(id:string, updatedData: any){
  this.http.patch(`http://localhost:3000/posts${id}`, updatedData)
}
  
}
