import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Moment } from '../Interfaces/Moment';
import { Response } from '../Interfaces/Response';

import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private urlApiMoments: string = environment.urlApiMoments;


  constructor(private http: HttpClient) { }

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.urlApiMoments);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    return this.http.get<Response<Moment>>(`${this.urlApiMoments}/${id}`);
  }


  addMoment(forDataMoment: FormData): Observable<Response<Moment>> {

    console.log("ok")
    return this.http.post<Response<Moment>>(this.urlApiMoments, forDataMoment);

  }

  updateMoment(id: number,forDataMoment: FormData): Observable<Response<Moment>> {
    return this.http.put<Response<Moment>>(`${this.urlApiMoments}/${id}`,forDataMoment);
  }

  removeMoment(id: number): Observable<Response<Moment>> {
    return this.http.delete<Response<Moment>>(`${this.urlApiMoments}/${id}`);
  }

}
