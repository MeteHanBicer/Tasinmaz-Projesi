import { Component, Input, OnInit } from '@angular/core';
import { KullaniciService } from 'src/app/kullanici.service';
import { Kullanici } from 'src/app/model';

@Component({
  selector: 'kullaniciform',
  templateUrl: './kullaniciform.component.html',
  styleUrls: ['./kullaniciform.component.css']
})
export class KullaniciformComponent implements OnInit {

 @Input() kullanicilar : Kullanici[];

  constructor(private kullaniciService : KullaniciService) { }

  ngOnInit() : void {
  }
  addKullanici(ad:string,soyad:string,email:string,sifre:string,adres:string,rol:string)
  {
    const k = new Kullanici(0,ad,soyad,email,sifre,adres,rol);
    this.kullaniciService.addKullanici(k).subscribe(kullanici =>{
      this.kullanicilar.push(kullanici);
    } );
  }
  
    
  
}
