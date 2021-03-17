import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log, Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class logservice {
  baseUrl: string = "http://localhost:5000/";

  model = new Model();

  constructor(private http: HttpClient) { }
  addLog(log : Log):Observable<Log>
  {
    return this.http.post<Log>(this.baseUrl + "api/Log", log);
  }
}
