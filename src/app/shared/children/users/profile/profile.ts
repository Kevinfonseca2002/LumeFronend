import { Component } from '@angular/core';
import { HttpAuth } from '../../../../core/services/http-auth';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpUsers } from '../../../../core/services/http-users';
import { HttpPosts } from '../../../../core/services/http.posts';


@Component({
  selector: 'user-profile',
  imports: [ AsyncPipe, JsonPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  posts!: any;
  editMode: boolean = false;

  constructor( 
    public httpAuth: HttpAuth,
    public httpUser: HttpUsers,
    public httpPost: HttpPosts,
    private router: Router ) {
      this.posts=this.populatePosts()
    }

  ngOnInit(): void {
    
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

  populatePosts(){
    this.httpPost.findAllPost().subscribe({
      next: data => {console.log(data)},
      error: error => {console.error(error)},
    })
  }

}
