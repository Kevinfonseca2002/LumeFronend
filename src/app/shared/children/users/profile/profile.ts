import { Component } from '@angular/core';
import { HttpAuth } from '../../../../core/services/http-auth';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpUsers } from '../../../../core/services/http-users';
import { HttpPosts } from '../../../../core/services/http.posts';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { ProfileEditform } from '../../../layout/profile-editform/profile-editform';


@Component({
  selector: 'user-profile',
  imports: [AsyncPipe, ProfileEditform, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  posts!: any[]
  editMode: boolean = false;
  userId: string | undefined;

  constructor(
    public httpAuth: HttpAuth,
    public httpUser: HttpUsers,
    public httpPost: HttpPosts,
    private router: Router) { }

  ngOnInit(): void {
    this.httpAuth.getId().pipe(take(1)).subscribe({
      next: (id) => {
        this.userId = id
        if (this.userId) {
          this.httpPost.getPostsByUser(this.userId).subscribe({
            next: (data) => {
              console.log('Posts:', data.posts)
              this.posts = data.posts
            },
            error: (err) => console.error(err)
          })
          this.httpPost.getPostsByUser(this.userId).subscribe({
            next: (data) => this.posts = data.posts,
            error: (err) => console.error(err),
            complete: () => console.log(this.posts)
          })

          this.httpUser.getUserById(id).pipe(take(1)).subscribe({
            next: (data) => {
              this.httpAuth.saveLocalStorage(
                localStorage.getItem('token')!,
                data.userById
              )
            },
            error: (err) => console.error(err)
          })
        }
      }
    })
  }


  editProfile() {
    this.editMode = true;
  }

  cancelEditProfile() {
    this.editMode = false;
  }

  deleteProfile(id: string | undefined) {

    this.httpUser.deleteUser(`${id}`).subscribe({
      next: (data) => {
        console.log("Delete ID:", id);
        console.log("data:", this.posts)
      },
      error: (error) => console.error('Error deleting the profile, please try again', error),
      complete: () => this.router.navigate(["home"])
    })
  }




}
