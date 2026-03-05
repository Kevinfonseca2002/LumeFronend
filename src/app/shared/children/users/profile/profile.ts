import { Component } from '@angular/core';
import { HttpAuth } from '../../../../core/services/http-auth';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpUsers } from '../../../../core/services/http-users';
import { HttpPosts } from '../../../../core/services/http.posts';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ProfileEditform } from '../../../layout/profile-editform/profile-editform';


@Component({
  selector: 'user-profile',
  imports: [ AsyncPipe, JsonPipe, ProfileEditform],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  public posts: Observable<any[]> = new Observable<any[]>();
  editMode: boolean = false;
  private posts$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)

  constructor( 
    public httpAuth: HttpAuth,
    public httpUser: HttpUsers,
    public httpPost: HttpPosts,
    private router: Router ) {}

  ngOnInit(): void {
    this.posts= this.posts$.pipe(
      switchMap(()=>this.httpPost.findAllPost())
    )
    console.log(this.posts, this.posts$)
  }

  editProfile() {
    this.editMode = true;
  }

  cancelEditProfile() {
    this.editMode = false;
  }

  deleteProfile(id:string | undefined) {
   
    this.httpUser.deleteUser(`${id}`).subscribe({
      next: (data) => {
        console.log("Delete ID:", id);
        console.log("data:", this.posts)
      },
      error: (error) => console.error('Error deleting the profile, please try again', error),      
    })
  }

  // populatePosts(){
  //   this.httpPost.findAllPost().subscribe({
  //     next: data => {console.log(data)},
  //     error: error => {console.error(error)},
  //   })
  // }

}
