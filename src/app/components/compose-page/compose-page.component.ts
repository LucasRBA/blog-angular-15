import { Component, OnInit,Input, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-compose-page',
  templateUrl: './compose-page.component.html',
  styleUrls: ['./compose-page.component.css']
})


export class ComposePageComponent implements OnInit {

  post: Post = {
    title: '',
    author:'',
    image:'',
    content:''
  };
  submitted = false;

  constructor(private postService : PostServiceService) {}

  ngOnInit(): void {
  }

  savePost():void {
    const data = {
      title: this.post.title,
      author: this.post.author,
      image: this.post.image,
      content: this.post.content
    };
    this.postService.create(data)
      .subscribe({
        next:(res) =>{
          console.log(res);
          this.submitted=true;
        },
        error: (e) => console.error(e)
      });
  }

  newPost():void {
    this.submitted = false;
    this.post = {
      title:'',
      author:'',
      image:'',
      content:''
    };
  }

}
