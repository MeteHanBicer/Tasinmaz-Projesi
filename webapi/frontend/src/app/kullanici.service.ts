import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Kullanici, Model } from "./model";

@Injectable({
  providedIn: "root",
})
export class KullaniciService {
  baseUrl: string = "http://localhost:5000/";

  model = new Model();

  constructor(private http: HttpClient) { }

  addKullanici(kullanici : Kullanici):Observable<Kullanici>
  {
    return this.http.post<Kullanici>(this.baseUrl + "api/Kullanici", kullanici);
  }

  updateKullanici(kullanici : Kullanici)    
  {
    return this.http.put<Kullanici>(this.baseUrl + "api/Kullanici/" + kullanici.id , kullanici);
  }

  deleteKullanici(kullanici: Kullanici) :Observable<Kullanici> {
    return this.http.delete<Kullanici>(this.baseUrl + 'api/Kullanici/' + kullanici.id);
  }

  getKullaniciById(id: number) {
    return this.model.kullanicilar.find(i => i.id == id);
  }
  saveKullanici(kullanici: Kullanici) {
    if (kullanici.id == null) {
      this.model.kullanicilar.push(kullanici);
    } else {
      const k = this.getKullaniciById(kullanici.id);
      k.ad = kullanici.ad;
      k.soyad = kullanici.soyad;
      k.email = kullanici.email;
      k.sifre=kullanici.sifre;
      k.adres = kullanici.adres;
      k.rol = kullanici.rol;
    }
  }
 
}
