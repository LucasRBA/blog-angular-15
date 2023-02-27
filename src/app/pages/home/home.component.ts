import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SmallCardComponent } from 'src/app/components/small-card/small-card.component';
import { PostServiceService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
posts: Post[] | undefined

  constructor(
    private postService:PostServiceService
  ) { }

  smallCard : SmallCardComponent = new SmallCardComponent(this.postService) 

  ngOnInit(): void {
    this.postService.orderBySubmitDate().subscribe((data => {
      this.posts = data;
    }))
  }

}
