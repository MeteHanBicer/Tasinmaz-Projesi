import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CascadingService } from 'src/app/cascading.service';
import { ExcelService } from 'src/app/ExcelService';
import { Il, Ilce, Mahalle, Tasinmaz, TasinmazModel } from 'src/app/tasinmaz-model';
import { TasinmazService } from 'src/app/tasinmaz.service';

@Component({
  selector: 'app-tasinmazlar',
  templateUrl: './tasinmazlar.component.html',
  styleUrls: ['./tasinmazlar.component.css']
})
export class TasinmazlarComponent implements OnInit {
  selectedTasinmaz : Tasinmaz;
  dataLoaded = false;
  @Input() tasinmaz: Tasinmaz;
  @Input() il: Il;
  @Input() ilce: Ilce;
  @Input() mahalle: Mahalle;
 @Input() tasinmazlar: Tasinmaz[];
 @Input() iller: Il[];
 @Input() ilceler: Ilce[];
 @Input() mahalleler: Mahalle[];
 search:any;
 ilList;
 ilceList;
 mahalleList;
 firstname:string;
 dropDownForm:FormGroup;
 modela : any = {};
 model = new TasinmazModel;
 baseUrl: string = "http://localhost:5000/";
 // public Time: Tasinmaz[];
 public pageNumber: number = 1;
 public Count: number;
 constructor(private tasinmazService : TasinmazService,private http: HttpClient,private excelService:ExcelService,private cascadingService:CascadingService,private fb:FormBuilder) {
  this.http = http;
}
  ngOnInit() : void {
    this.dropDownForm = this.fb.group({
      il : ['0'],
      ilce:['0'],
      mahalle:['0']
    })
    this.getTasinmazlar();
    this.getIller();
    this.getIlceler();
    this.getMahalleler();
    this.cascadingService.getAllIl().subscribe(ilList=>{
      this.ilList=ilList;
      
    })
  }
  Search(){
    if(this.firstname!=""){
      this.tasinmazlar=this.tasinmazlar.filter(res=>{
        return res.Mahalle.ad.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
      })
    }else if (this.firstname== ""){
      this.ngOnInit();
    }
   
  }

  getTasinmazlarsearch()
  {
    this.http.get<PageResult<Tasinmaz>>(this.baseUrl + 'api/Tasinmaz/getTasinmazsearch/'+this.search).subscribe(result => {
      this.tasinmazlar = result.items;
        this.tasinmazlar = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
        this.search=result.Search;
        this.dataLoaded = true;
      });
  }

  getTasinmazlar()
  {
        this.http.get<PageResult<Tasinmaz>>(this.baseUrl + 'api/Tasinmaz/getTasinmaz').subscribe(result => {
        this.tasinmazlar = result.items;
        this.tasinmazlar = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
        this.dataLoaded = true;
      });
  }
  GetIlceById(event){
    this.cascadingService.getIlceByIl(Number(event.target.value)).subscribe(ilceList => {
      this.ilceList = ilceList;
      this.dataLoaded = true;

    })
  }
  GetMahalleById(event){
    this.cascadingService.getMahalleByIlce(Number(event.target.value)).subscribe(mahalleList => {
      this.mahalleList = mahalleList;
      this.dataLoaded = true;

    })
  }
  exportAsXLSX():void{
    this.excelService.exportAsExcelFileTasinmaz(this.tasinmazlar,'rapor');
  }
  getIller()
  {
    this.http.get<Il>(this.baseUrl + 'api/Il/GetIller').subscribe(result => {
      this.il = result;
      this.dataLoaded = true;

      });
  }
  getIlceler()
  {
    this.http.get<Ilce>(this.baseUrl + 'api/Ilce/GetIlceler').subscribe(result => {
      this.ilce = result;
      this.dataLoaded = true;

      });
  }
  getMahalleler()
  {
    this.http.get<Mahalle>(this.baseUrl + 'api/Mahalle/GetMahalleler').subscribe(result => {
      this.mahalle = result;
      this.dataLoaded = true;

      });
  }
  public onPageChange = (pageNumber) => {
    this.http.get<PageResult<Tasinmaz>>(this.baseUrl + 'api/Tasinmaz/GetTasinmaz?page=' + pageNumber).subscribe(result => {
    this.tasinmazlar = result.items;
    this.pageNumber = result.pageIndex;
    this.Count = result.count;
    this.dataLoaded = true;

    })}
  

    //
    addTasinmaz(ilId:number,ilceId:number,mahalleId:number,ada:number,parsel:number,nitelik:number)
    {
      const t = new Tasinmaz(0,ilId,ilceId,mahalleId,ada,parsel,nitelik);
      this.tasinmazService.addTasinmaz(t).subscribe(t =>{
        this.tasinmazlar.push(t);
      } );
    }
  updateTasinmaz(id : number,ilId:number,ilceId:number,mahalleId:number,ada : number,parsel:number,nitelik:number) {

    const k = new Tasinmaz(id,ilId,ilceId,mahalleId,ada,parsel,nitelik);
    this.tasinmazService
    .updateTasinmaz(k)
    .subscribe(result =>{
          this.tasinmazlar.splice(this.tasinmazlar.findIndex(x =>x.id==k.id),1,k);
    })
    this.tasinmaz = null;
  }
  
  onSelectTasinmaz(tasinmaz:Tasinmaz){
    this.selectedTasinmaz = tasinmaz;
  }

  deleteTasinmaz(tasinmaz : Tasinmaz)
  {
    this.tasinmazService.deleteTasinmaz(tasinmaz).subscribe(k => {
      this.tasinmazlar.splice(this.tasinmazlar.findIndex(k=>k.id == tasinmaz.id),1)
    });
  }
}
