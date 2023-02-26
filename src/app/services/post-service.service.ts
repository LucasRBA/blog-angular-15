import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';


const baseUrl = 'http://localhost:8080/api/posts'

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(baseUrl);
  }

  get(id:string): Observable<Post> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: object | any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id:string, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:string | any): Observable<string | any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByTitle(title:string): Observable<string | Post[]> {
    return this.http.get<Post[]>(`${baseUrl}?title=${title}`)
  }

  findById(id:string): Observable<string | Post[]> {
    return this.http.get<Post[]>(`${baseUrl}?title=${id}`)
  }

  //Will retrieve all the post and sort them, the last post created [0] will be sent to be rendered inside big-card
  //the others will be rendered as small-cards
  orderBySubmitDate(): Observable<Post[]> {
    const postArray = this.getAll().subscribe;
    return this.getAll().pipe(
      map(postArray =>{
        return postArray.sort((a,b) => {
          const dateA = (a.createdAt) ? new Date(a.createdAt) : new Date(0);
          const dateB = (b.createdAt) ? new Date(b.createdAt) : new Date(0);
          //console.log(postArray);
          return dateB.getTime() - dateA.getTime();
        })
        
      })
    )
  }
}
