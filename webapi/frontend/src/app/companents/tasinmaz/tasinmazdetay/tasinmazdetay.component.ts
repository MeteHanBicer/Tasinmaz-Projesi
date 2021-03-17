import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CascadingService } from 'src/app/cascading.service';
import { Il, Ilce, Mahalle, Tasinmaz } from 'src/app/tasinmaz-model';
import { TasinmazService } from 'src/app/tasinmaz.service';

@Component({
  selector: 'tasinmazdetay',
  templateUrl: './tasinmazdetay.component.html',
  styleUrls: ['./tasinmazdetay.component.css']
})
export class TasinmazdetayComponent implements OnInit {
  @Input() tasinmaz: Tasinmaz;
  @Input() il: Il;
  @Input() ilce: Ilce;
  @Input() mahallle: Mahalle;
  @Input() tasinmazlar: Tasinmaz[]=new Array();
  @Input() iller: Il[];
  @Input() ilceler: Ilce[]=new Array();
  @Input() mahalleler: Mahalle[]=new Array();
  
 ilList;
 ilceList;
 mahalleList;
 dropDownForm:FormGroup;

  constructor(private tasinmazService: TasinmazService,private http: HttpClient,private cascadingService:CascadingService,private fb:FormBuilder) {}


  ngOnInit() {
    
    this.dropDownForm = this.fb.group({
      il : ['0'],
      ilce:['0'],
      mahalle:['0']
    })
    this.cascadingService.getAllIl().subscribe(ilList=>{
      this.ilList=ilList;
    })
  }

  addTasinmaz(id : number,ilId:number,ilceId:number,mahalleId:number,ada:number,parsel:number,nitelik:number) {

    const k = new Tasinmaz(0,ilId,ilceId,mahalleId,ada,parsel,nitelik);
    this.tasinmazService.addTasinmaz(k).subscribe(tasinmaz =>{
      this.tasinmazlar.push(tasinmaz);
    })
    this.tasinmaz = null;
  }
  GetIlceById(event){
    this.cascadingService.getIlceByIl(Number(event.target.value)).subscribe(ilceList => {
      this.ilceList = ilceList;
    })
  }
  GetMahalleById(event){
    this.cascadingService.getMahalleByIlce(Number(event.target.value)).subscribe(mahalleList => {
      this.mahalleList = mahalleList;
    })
  }
  updateTasinmaz(id : number, ilId : number, ilceId:number, mahalleId:number, ada:number, parsel:number,nitelik:number) {

    const k = new Tasinmaz(id,ilId,ilceId,mahalleId,ada,parsel,nitelik);
    this.tasinmazService
    .updateTasinmaz(k)
    .subscribe(result =>{
          this.tasinmazlar.splice(this.tasinmazlar.findIndex(x =>x.id==k.id),1,k);
    })
    this.tasinmaz = null;
  }

}
