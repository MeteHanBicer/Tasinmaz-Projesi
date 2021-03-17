import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/ExcelService';
import { logservice } from 'src/app/logservice';
import { Log, Model } from 'src/app/model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  dataLoaded = false;
  selectedLog : Log;
  @Input() log: Log;
 @Input() loglar: Log[];
 search:any;
 firstname:string;
 modele : any = {};
 model = new Model;
 baseUrl: string = "http://localhost:5000/";
 public pageNumber: number = 1;
 public Count: number;
  constructor(private logservice:logservice,private http: HttpClient,private excelService : ExcelService) {
    this.http = http;  
  }
  ngOnInit() : void {
    this.getLoglar();
  }

  getLogsearch()
  {
    this.http.get<PageResult<Log>>(this.baseUrl + 'api/Log/getLogsearch/'+this.search).subscribe(result => {
      this.loglar = result.items;
        this.loglar = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
        this.search=result.Search;
        this.dataLoaded = true;
      });
  }

  getLoglar()
  {
    this.http.get<PageResult<Log>>(this.baseUrl + 'api/Log/getLog').subscribe(result => {
      this.loglar = result.items;
        this.loglar = result.items;
        this.pageNumber = result.pageIndex;
        this.Count = result.count;
        this.dataLoaded = true;

      });
  }

  Search(){
    if(this.firstname!=""){
      this.loglar=this.loglar.filter(res=>{
        return res.islemTipi.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
      })
    }else if (this.firstname== ""){
      this.ngOnInit();
    }
   
  }
  

exportAsXLSX():void{
  this.excelService.exportAsExcelFileLog(this.loglar,'rapor');
}

  public onPageChange = (pageNumber) => {
    this.http.get<PageResult<Log>>(this.baseUrl + 'api/Log/getLog?page=' + pageNumber).subscribe(result => {
    this.loglar = result.items;
    this.pageNumber = result.pageIndex;
    this.Count = result.count;
    })}
  
  addLog(durum:string,islemTipi:string,tarihsaat:number,ip:number,aciklama:string)
  {
    const k = new Log(0,durum,islemTipi,tarihsaat,ip,aciklama);
    this.logservice.addLog(k).subscribe(k =>{
      this.loglar.push(k);
      
    } );
  }
 

}
