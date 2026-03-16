import { Component } from '@angular/core';
import { HttpPosts } from '../../../../core/services/http.posts';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpAuth } from '../../../../core/services/http-auth';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { HttpUsers } from '../../../../core/services/http-users';


@Component({
  selector: 'app-feed',
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {

  //TODO: Create a post interface and use it instead of any, and bring the posts from the backend
postsForm!:FormGroup
selectedFile!: File 
id!:string | undefined
userInfo!:any

public posts: Observable<any[]> = new Observable<any[]>();
private posts$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)


constructor(
    private httpPost: HttpPosts,
    public httpAuth: HttpAuth,
    public httpUser: HttpUsers
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

        this.httpAuth.getId().subscribe({
      next: data=> {
        this.id=data;
        if (this.id) {
          this.httpUser.getUserById(this.id).subscribe({
            next: userData=> this.userInfo=userData.userById,
            error: error=>console.error(error),
            complete:()=>{
              console.log(this.userInfo)
            }
          });
        }
      },
      error: error=>console.error(error),
      complete:()=>{
        console.log(this.id)
      }
    });
  }

  onFileChange(event: any){
    const file = event.target.files[0]
    if(file) this.selectedFile = file
  }

  onSubmit(){
    // if(this.postsForm.value){
    //   this.httpPost.createPost(this.postsForm.value).subscribe({
    //     next: data => console.log(data),
    //     error: error => console.error(error)
    //   })
    // }
        if(this.postsForm.value){
      const formData = new FormData()

      this.postsForm.patchValue({ userName: this.id })

      Object.keys(this.postsForm.value).forEach(key => {
        formData.append(key, this.postsForm.value[key])
      })

      if(this.selectedFile) formData.append('postImg', this.selectedFile)

      this.httpPost.createPost(formData).subscribe({
        next: data => {
          console.log(data)
          this.posts$.next()
        },
        error: error => console.error(error)
      })
    }
  }

}
