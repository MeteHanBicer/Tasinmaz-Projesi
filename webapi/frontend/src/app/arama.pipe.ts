import { Pipe, PipeTransform } from '@angular/core';
import { Kullanici } from './model';

@Pipe({
  name: 'arama'
})
export class AramaPipe implements PipeTransform {

  transform(Kullanicilar : Kullanici[],arama:string): Kullanici {
    // if(!Kullanicilar || !arama){
    //   return Kullanicilar;
    // }
    return null;
  }

}
