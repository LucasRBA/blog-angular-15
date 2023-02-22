import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

const baseUrl = 'http://localhost:3000/api/posts'

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
}
