import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/models/post.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {

  posts?: Post[]| any
  currentPost : Post = {}
  title = ''


  constructor(private postService:PostServiceService) { }

  ngOnInit(): void {
    this.getCurrentSmallCard();
  }

// Removes the top element in order to show all but the post on big card as a small card
  getCurrentSmallCard():any {
    const result = this.postService.orderBySubmitDate().subscribe({
      next: (data) => {
        this.posts = data;
        data.shift(); 
        console.log(data);
      },
      error :(e) =>{
        console.error(e)
      }
    })
    return result 
  }


}
