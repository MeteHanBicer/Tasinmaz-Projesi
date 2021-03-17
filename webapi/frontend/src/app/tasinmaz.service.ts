import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Il, Ilce, Mahalle, Tasinmaz, TasinmazModel } from "./tasinmaz-model";

@Injectable({
  providedIn: "root",
})
export class TasinmazService {
  baseUrl: string = "http://localhost:5000/";
  model = new TasinmazModel();

  constructor(private http: HttpClient) {}
  // getKullanicilar(): Observable<Kullanici[]> {
  //   return this.http.get<Kullanici[]>(this.baseUrl + "api/Kullanici/getKullanici");
  // }

  addIl(il: Il): Observable<Il> {
    return this.http.post<Il>(this.baseUrl + "api/Il", il);
  }

  updateIl(il: Il) {
    return this.http.put<Il>(this.baseUrl + "api/Il/" + il.id, il);
  }
  deleteIl(il: Il): Observable<Il> {
    return this.http.delete<Il>(this.baseUrl + "api/Il/" + il.id);
  }
  getIlById(id: number) {
    return this.model.iller.find((i) => i.id == id);
  }
  addIlce(ilce: Ilce): Observable<Ilce> {
    return this.http.post<Ilce>(this.baseUrl + "api/Ilce", ilce);
  }

  updateIlce(ilce: Ilce) {
    return this.http.put<Ilce>(this.baseUrl + "api/Ilce/" + ilce.id, ilce);
  }
  deleteIlce(ilce: Ilce): Observable<Ilce> {
    return this.http.delete<Ilce>(this.baseUrl + "api/Ilce/" + ilce.id);
  }
  getIlceById(id: number) {
    return this.model.ilceler.find((i) => i.id == id);
  }
  addMahalle(mahalle: Mahalle): Observable<Mahalle> {
    return this.http.post<Mahalle>(this.baseUrl + "api/Mahalle", mahalle);
  }
  updateMahalle(mahalle: Mahalle) {
    return this.http.put<Mahalle>(
      this.baseUrl + "api/Mahalle/" + mahalle.id,
      mahalle
    );
  }
  deleteMahalle(mahalle: Mahalle): Observable<Mahalle> {
    return this.http.delete<Mahalle>(
      this.baseUrl + "api/Mahalle/" + mahalle.id
    );
  }
  getMahalleById(id: number) {
    return this.model.mahalleler.find((i) => i.id == id);
  }
  addTasinmaz(tasinmaz : Tasinmaz):Observable<Tasinmaz>
  {
    return this.http.post<Tasinmaz>("http://localhost:5000/api/Tasinmaz", tasinmaz);
  }

  updateTasinmaz(tasinmaz: Tasinmaz) {
    return this.http.put<Tasinmaz>(this.baseUrl + "api/Tasinmaz/UpdateTasinmaz/" + tasinmaz.id,tasinmaz);
  }

  deleteTasinmaz(tasinmaz: Tasinmaz): Observable<Tasinmaz> {
    return this.http.delete<Tasinmaz>(
      this.baseUrl + "api/Tasinmaz/" + tasinmaz.id
    );
  }

  getTasinmazById(id: number) {
    return this.model.tasinmazlar.find((i) => i.id == id);
  }
  saveTasinmaz(tasinmaz: Tasinmaz) {
    if (tasinmaz.id == null) {
      this.model.tasinmazlar.push(tasinmaz);
    } else {
      const k = this.getTasinmazById(tasinmaz.id);
      k.ilId = tasinmaz.ilId;
      k.ilceId = tasinmaz.ilceId;
      k.mahalleId = tasinmaz.mahalleId;
      k.ada = tasinmaz.ada;
      k.parsel = tasinmaz.parsel;
      k.nitelik = tasinmaz.nitelik;
    }
  }

  saveIl(il: Il) {
    if (il.id == null) {
      this.model.iller.push(il);
    } else {
      const k = this.getIlById(il.id);
      k.ad = il.ad;
      k.id = il.id;
    }
  }
  saveIlce(ilce: Ilce) {
    if (ilce.id == null) {
      this.model.ilceler.push(ilce);
    } else {
      const k = this.getIlceById(ilce.id);
      k.id = ilce.id;
      k.ad = ilce.ad;
      k.ilid = ilce.ilid;
    }
  }
  saveMahalle(mahalle: Mahalle) {
    if (mahalle.id == null) {
      this.model.mahalleler.push(mahalle);
    } else {
      const k = this.getMahalleById(mahalle.id);
      k.id = mahalle.id;
      k.ad = mahalle.ad;
      k.ilceid = mahalle.ilceid;
    }
  }
}
