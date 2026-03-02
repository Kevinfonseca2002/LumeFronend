import { Component } from '@angular/core';
import { HttpAuth } from '../../../../core/services/http-auth';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpUsers } from '../../../../core/services/http-users';


@Component({
  selector: 'user-profile',
  imports: [ AsyncPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  posts!: any;
  editMode: boolean = false;

  constructor( 
    public httpAuth: HttpAuth,
    public httpUser: HttpUsers,
    private router: Router ) {}

  ngOnInit(): void {
    
  }

  editProfile() {
    this.editMode = true;
  }

  cancelEditProfile() {
    this.editMode = false;
  }

  deleteProfile(id:string) {
   
    this.httpUser.deleteUser(id).subscribe({
      next: (data) => {
        console.log("Delete ID:", id);
        console.log("data:", this.posts)
      },
      error: (error) => console.error('Error deleting the profile, please try again', error),      
    })
  }

}
