import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostServiceService } from 'src/app/services/post-service.service';
import { DateConversionService } from 'src/app/services/date-conversion.service';



@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent implements OnInit {

  posts?: Post[]
  currentPost: Post = {};
  currentIndex = -1;
  title = ''

  constructor(private postService : PostServiceService,
              private dateConverter : DateConversionService) { }



  ngOnInit(): void {
    const postArray$ = from(this.getCurrentBigCard());
  }

  getCurrentBigCard():any {
    const result = this.postService.orderBySubmitDate().subscribe({
      next: (data) => {
        this.posts = data;
        console.log(data);
      },
      error :(e) =>{
        console.error(e)
      }
    })
    return result 
  }

  convertDate(date:Date | string | undefined): Date | string {
    const convertedDate = this.dateConverter.convertCreationDate(date);
    return convertedDate;
  }


}
// Read More inclusion with link when the post content has more than 200 characters