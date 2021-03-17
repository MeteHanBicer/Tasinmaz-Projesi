import { AnimateTimings } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/ExcelService';
import { KullaniciService } from 'src/app/kullanici.service';
import { Kullanici, Model } from 'src/app/model';
@Component({
  selector: 'kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.css']
})
export class KullanicilarComponent implements OnInit {
  dataLoaded = false;
   selectedKullanici : Kullanici;
   @Input() kullanici: Kullanici;
  @Input() kullanicilar: Kullanici[];
  search:any;
  firstname:string;
  modele : any = {};
  model = new Model;
  baseUrl: string = "http://localhost:5000/";
  public pageNumber: number = 1;
  public Count: number;
  constructor(private kullaniciService : KullaniciService,private http: HttpClient,private excelService : ExcelService) {
    this.http = http;
  }
  ngOnInit() : void {
    this.getKullanicilar();
  }
  login() {
    console.log(this.modele);
  }          
                                
  getKullanicilarsearch()
  {
    this.http.get<PageResult<Kullanici>>(this.baseUrl + 'api/Kullanici/getKullanicisearch/'+this.search).subscribe(result => {
      this.kullanicilar = result.items;
        this.kullanicilar = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
        this.search=result.Search;
        this.dataLoaded = true;
      });
  }

  getKullanicilar()
  {
    this.http.get<PageResult<Kullanici>>(this.baseUrl + 'api/Kullanici/getKullanici').subscribe(result => {
      this.kullanicilar = result.items;
        this.kullanicilar = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
        this.dataLoaded = true;
      });
  }
  
  Search(){
    if(this.firstname!=""){
      this.kullanicilar=this.kullanicilar.filter(res=>{
        return res.ad.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
      })
    }else if (this.firstname== ""){
      this.ngOnInit();
    }
  }
exportAsXLSX():void{
  this.excelService.exportAsExcelFileKullanici(this.kullanicilar,'rapor');
}
  public onPageChange = (pageNumber) => {
    this.http.get<PageResult<Kullanici>>(this.baseUrl + 'api/Kullanici/GetKullanici?page=' + pageNumber).subscribe(result => {
    this.kullanicilar = result.items;
    this.pageNumber = result.pageIndex;
    this.Count = result.count;
    })}
  addKullanici(ad:string,soyad:string,email:string,sifre:string,adres:string,rol:string)
  {
    const k = new Kullanici(0,ad,soyad,email,sifre,adres,rol);
    this.kullaniciService.addKullanici(k).subscribe(k =>{
      this.kullanicilar.push(k);
    } );
  }
  updateKullanici(id : number,ad : string,soyad:string,email:string,sifre:string,adres:string,rol:string) {
    const k = new Kullanici(id,ad,soyad,email,sifre,adres,rol);
    this.kullaniciService
    .updateKullanici(k)
    .subscribe(result =>{
          this.kullanicilar.splice(this.kullanicilar.findIndex(x =>x.id==k.id),1,k);
    })
    this.kullanici = null;
  }
  onSelectKullanici(kullanici:Kullanici){
    this.selectedKullanici = kullanici;
  }
  deleteKullanici(kullanici : Kullanici)
  {
    this.kullaniciService.deleteKullanici(kullanici).subscribe(k => {
      this.kullanicilar.splice(this.kullanicilar.findIndex(k=>k.id == kullanici.id),1)
    });
  }
}