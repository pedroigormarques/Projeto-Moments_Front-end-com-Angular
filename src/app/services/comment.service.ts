import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Comment } from '../Interfaces/Comment';
import { Response } from '../Interfaces/Response';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  urlApiMoments = environment.urlApiMoments;

  constructor(private http: HttpClient) {
  }

  addComment(idMoment: number, comment: Comment): Observable<Response<Comment>> {
    return this.http.post<Response<Comment>>(`${this.urlApiMoments}/${idMoment}/comments`, comment)
  }

}
