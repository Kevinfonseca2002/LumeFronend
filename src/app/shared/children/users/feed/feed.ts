import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  imports: [],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {

  //TODO: Create a post interface and use it instead of any, and bring the posts from the backend
posts: any[] = [];
files: any = []

  constructor() {
  }

  captureFile(event: any) {
    const file = event.target.files[0];
    this.files.push(file);
    console.log(file);
  }
  //TODO: Image must be turn into Base64 to be previewed and then send to the backend
}
