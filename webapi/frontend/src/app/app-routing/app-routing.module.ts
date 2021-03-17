import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { KullanicilarComponent } from '../companents/kullanicilar/kullanicilar.component';
import { TasinmazlarComponent } from '../companents/tasinmaz/tasinmazlar/tasinmazlar.component';
import { AnasayfaComponent } from '../companents/anasayfa/anasayfa.component';
import { LogComponent } from '../companents/log/log.component';


export const routes:Routes=[
  { path:'' , component : AnasayfaComponent },
  { path:'log' , component : LogComponent },
  { path:'anasayfa' , component : AnasayfaComponent },
  { path:'tasinmazlar' , component : TasinmazlarComponent },
  { path:'kullanicilar' , component : KullanicilarComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    RouterModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[TasinmazlarComponent,KullanicilarComponent]
