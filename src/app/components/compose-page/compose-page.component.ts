import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit,Input, NgModule, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostServiceService } from 'src/app/services/post-service.service';
import { AlertComponent } from '../alert/alert.component';
import { ButtonComponent } from '../button/button.component';


@Component({
  selector: 'app-compose-page',
  templateUrl: './compose-page.component.html',
  styleUrls: ['./compose-page.component.css']
})

export class ComposePageComponent implements OnInit {

  postContent!: FormGroup;

  inputValue = '';

  post: Post = {
    title: '',
    author:'',
    image:'',
    content:''
  };
  submitted = false;

  @Input()
  showMoreControls:string =''
  
  @ViewChild('postButton', {read: ElementRef})
  postButtonRef!: ElementRef<ButtonComponent>;

  alert: AlertComponent = new AlertComponent();

  constructor(
    private postService : PostServiceService,
    private renderer: Renderer2,
    private fb: FormBuilder
            ) 
      {
        this.createForm();
      }

  createForm() {
  }

  

  ngOnInit(): void {
    const postButton = this.renderer.selectRootElement('.compose_button', true);
    this.renderer.addClass(postButton,'initialState');
    console.log(postButton.classList);

    this.postContent = new FormGroup({
      title : new FormControl(this.post.title,[Validators.required, Validators.minLength(2)]),
      content : new FormControl(this.post.content,[Validators.required, Validators.minLength(20)]),
      image : new FormControl(this.post.image ,[Validators.required, Validators.minLength(20)])
    });
  }

  get title() {return this.postContent.get('title')}
  get content() {return this.postContent.get('content')}
  get image() {return this.postContent.get('image')}

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

  redirectAfterDelay(seconds: number, url: string): void {
    setTimeout(() => {
      window.location.href = url;
    }, seconds * 1000);
    this.alert.displayAlert(`Your post was successfully submitted, and you will be redirected in ${seconds} seconds`, seconds, 'green');
  }

  isTitleFilled(element: ElementRef, classToRemove:string):void {
    if(this.inputValue.length>0) {
      if(element.nativeElement.classList.contains(classToRemove)) {
        element.nativeElement.classList.remove(classToRemove);
        console.log(element.nativeElement.classList)
      }   
    } else {
      element.nativeElement.classList.add(classToRemove)
      console.log(element.nativeElement.classList)
    }
  }


  //two alerts bug fix when submit a post


}
