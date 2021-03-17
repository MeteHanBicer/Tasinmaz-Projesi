import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CascadingService {

  constructor(private http : HttpClient) { }
  getAllIl(){
    return this.http.get('http://localhost:5000/api/Il/GetIller');
  }
  getIlceByIl(ilId:number){
    return this.http.get('http://localhost:5000/api/Ilce/GetIlceById/'+ilId);
  }
  getMahalleByIlce(ilceId:number){
    return this.http.get('http://localhost:5000/api/Mahalle/GeMahalleById/'+ilceId);
  }
}
