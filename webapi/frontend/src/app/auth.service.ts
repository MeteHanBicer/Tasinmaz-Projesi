import { Injectable } from '@angular/core';
import { Kullanici } from './model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  authUser(user:any)
  {
    let Kullanicilar = [];
    if(localStorage.getItem('Kullanici'))
    {
      Kullanicilar = JSON.parse(localStorage.getItem('Kullanici'));
    }
    return Kullanicilar.find(p=>p.email == user.email && p.password == user.sifre);
  }
}
