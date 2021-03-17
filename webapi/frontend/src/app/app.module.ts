import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './companents/navbar/navbar.component';
import { KullanicilarComponent } from './companents/kullanicilar/kullanicilar.component';
import { KullaniciformComponent } from './companents/kullaniciform/kullaniciform.component';
import { KullanicidetayComponent } from './companents/kullanicidetay/kullanicidetay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AramaPipe } from './arama.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { TasinmazdetayComponent } from './companents/tasinmaz/tasinmazdetay/tasinmazdetay.component';
import { TasinmazlarComponent } from './companents/tasinmaz/tasinmazlar/tasinmazlar.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing/app-routing.module';
import { AnasayfaComponent } from './companents/anasayfa/anasayfa.component';
import { LogComponent } from './companents/log/log.component';
import { ExcelService } from './ExcelService';
import { AuthService } from './auth.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { FilterPipe } from './filter.pipe';
import { DataTablesModule } from 'angular-datatables';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    KullanicilarComponent,
    KullaniciformComponent,
    KullanicidetayComponent,
    AramaPipe,
    TasinmazdetayComponent,
    TasinmazlarComponent,
    AnasayfaComponent,
    LogComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    Ng2SearchPipeModule
  ],
  providers: [ExcelService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
