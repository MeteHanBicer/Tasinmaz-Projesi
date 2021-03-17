import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Kullanici } from 'src/app/model';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
model : any = {};
  constructor(private authService : AuthService,private router : Router,private http: HttpClient) { }
  @Input() kullanici: Kullanici;
  @Input() kullanicilar: Kullanici[] = [];
  apiemail : string;
  apisifre:string;
  apirol:string;
  apiad: string;
  apisoyad: string;
  rol:boolean = false;
 baseUrl: string = "http://localhost:5000/";
  ngOnInit() {
  }
emailll:string;
sifreee:string;
deneme: string;
basarili : boolean = false;
giris : boolean = false;
logIn(){
  this.http.get<Kullanici>(this.baseUrl + 'api/Kullanici/LoginCheck/'+ this.emailll + "/" + this.sifreee).subscribe(result => {
    if(result != null) {
      this.apirol = result.rol;
      this.apiad = result.ad;
      this.apisoyad = result.soyad;
      if(this.apirol=="Admin"){
        this.rol=true;
      }
      else{
        this.rol=false;
      }
      this.basarili=true;
      this.giris=true;
      alert("Giriş Başarılı "+this.apiad+ " " +this.apisoyad+" Hosgeldiniz");
    }
    });
  }
logout(){
  this.rol=false;
  this.basarili=false;
  this.giris=false;
}
}