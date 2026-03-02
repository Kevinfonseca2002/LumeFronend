import { Component } from '@angular/core';
import { HttpPosts } from '../../../../core/services/http.posts';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-feed',
  imports: [],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {

  //TODO: Create a post interface and use it instead of any, and bring the posts from the backend
posts: any[] = [];
files: any = [];


  constructor(
    private httpPost: HttpPosts,
    private activatedRoute: ActivatedRoute
  ) {
  }
  captureFile(event: any) {
    const file = event.target.files[0];
    this.files.push(file);
    console.log(file);
  }
  //TODO: Image must be turn into Base64 to be previewed and then send to the backend

  deletePost(){
    this.httpPost.deletePost(this.activatedRoute.snapshot.paramMap.get("id"))
  }

}
