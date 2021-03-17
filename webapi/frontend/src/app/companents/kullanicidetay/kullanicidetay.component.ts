import { Component, Input, OnInit } from "@angular/core";
import { KullaniciService } from "src/app/kullanici.service";
import { Kullanici } from "src/app/model";

@Component({
  selector: "kullanicidetay",
  templateUrl: "./kullanicidetay.component.html",
  styleUrls: ["./kullanicidetay.component.css"],
})
export class KullanicidetayComponent implements OnInit {
  @Input() kullanici: Kullanici;
  @Input() kullanicilar: Kullanici[]=new Array();

  constructor(private kullaniciService: KullaniciService) {}

  ngOnInit(): void {}
  
  addKullanici(id : number,ad : string,soyad:string,email:string,sifre:string,adres:string,rol:string) {

    const k = new Kullanici(id,ad,soyad,email,sifre,adres,rol);
    this.kullaniciService
    .updateKullanici(k)
    .subscribe(result =>{
          this.kullanicilar.splice(this.kullanicilar.findIndex(x =>x.id==k.id),1,k);
    })
    this.kullanici = null;
  }
  updateKullanici(id : number, ad : string, soyad:string, email:string, sifre:string, adres:string,rol:string) {

    const k = new Kullanici(id,ad,soyad,email,sifre,adres,rol);
    this.kullaniciService
    .updateKullanici(k)
    .subscribe(result =>{
          this.kullanicilar.splice(this.kullanicilar.findIndex(x =>x.id==k.id),1,k);
    })
    this.kullanici = null;
  }
}
