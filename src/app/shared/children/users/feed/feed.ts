import { Component } from '@angular/core';
import { HttpPosts } from '../../../../core/services/http.posts';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpAuth } from '../../../../core/services/http-auth';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-feed',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {

  //TODO: Create a post interface and use it instead of any, and bring the posts from the backend
postsForm!:FormGroup
public posts: Observable<any[]> = new Observable<any[]>();
private posts$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)


constructor(
    private httpPost: HttpPosts,
    public httpAuth: HttpAuth,
  ){
    this.postsForm= new FormGroup({
      userName: new FormControl(""),
      comment: new FormControl("")
    })
  }

  ngOnInit(){
    this.posts= this.posts$.pipe(
      switchMap(()=>this.httpPost.findAllPost())
    )
    console.log(this.posts)
  }

  onSubmit(){
    if(this.postsForm.value){
      this.httpPost.createPost(this.postsForm.value).subscribe({
        next: data => console.log(data),
        error: error => console.error(error)
      })
    }
  }

}
