import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { PostServiceService } from 'src/app/services/post-service.service';
import { DateConversionService } from 'src/app/services/date-conversion.service';
import { Post } from '../../models/post.model'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  private id:string | null = "0"
  @Input() currentPost : Post = {
  author: '',
  title:'',
  image:'',
  content: '',
  createdAt: ''
  }

  buttonComponent : ButtonComponent = new ButtonComponent();


  constructor(
    private route:ActivatedRoute,
    private postService:PostServiceService, 
    private router:Router, 
    private dateConverter : DateConversionService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
     this.id = value.get("id")

    )
    this.getCurrentDetailedPost(this.route.snapshot.params["id"]);
    
  }

  getCurrentDetailedPost(id:string):void {
    this.postService.get(id).subscribe({
      next:(data)=> {
        this.currentPost = data;
        console.log(this.currentPost);
      },
      error: (e) => {
        console.error(e);
      }
    })
  }


  convertDate(date:Date | string | undefined): Date | string {
    const convertedDate = this.dateConverter.convertCreationDate(date);
    return convertedDate;
  }

}
