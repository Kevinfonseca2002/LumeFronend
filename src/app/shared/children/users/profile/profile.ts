import { Component } from '@angular/core';

@Component({
  selector: 'user-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  posts: any[] = [];
  editMode: boolean = false;

  constructor() {}

  editProfile() {
    this.editMode = true;
  }

  cancelEditProfile() {
    this.editMode = false;
  }

}
