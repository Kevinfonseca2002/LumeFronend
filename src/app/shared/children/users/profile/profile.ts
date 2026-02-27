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

  posts: any[] = [];
  editMode: boolean = false;

  constructor( 
    public httpAuth: HttpAuth,
    public httpUser: HttpUsers,
    private router: Router ) {}



  editProfile() {
    this.editMode = true;
  }

  cancelEditProfile() {
    this.editMode = false;
  }

  deleteProfile() {
    this.httpUser.deleteUser
  }

}
