import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {
    constructor(){}
    public exportAsExcelFileKullanici(json:any[],excelFileName:string):void{
        const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook : XLSX.WorkBook = {Sheets:{ 'kullanicilar' : worksheet }, SheetNames:['kullanicilar']};
        const excelBuffer: any = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
        this.saveAsExcelFileKullanici(excelBuffer,excelFileName);
    }
    public exportAsExcelFileLog(json:any[],excelFileName:string):void{
        const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook : XLSX.WorkBook = {Sheets:{ 'loglar' : worksheet }, SheetNames:['loglar']};
        const excelBuffer: any = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
        this.saveAsExcelFileLog(excelBuffer,excelFileName);
    }

    private saveAsExcelFileLog(buffer:any,fileName:string):void{
        const data : Blob = new Blob([buffer],{type:EXCEL_TYPE});
        FileSaver.saveAs(data,fileName+'_loglar_'+ new Date().getTime()+EXCEL_EXTENSION);
    }
    private saveAsExcelFileKullanici(buffer:any,fileName:string):void{
        const data : Blob = new Blob([buffer],{type:EXCEL_TYPE});
        FileSaver.saveAs(data,fileName+'_kullanicilar_'+ new Date().getTime()+EXCEL_EXTENSION);
    }


    public exportAsExcelFileTasinmaz(json:any[],excelFileName:string):void{
        const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook : XLSX.WorkBook = {Sheets:{ 'tasinmazlar' : worksheet }, SheetNames:['tasinmazlar']};
        const excelBuffer: any = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
        this.saveAsExcelFileTasinmaz(excelBuffer,excelFileName);
    }
    private saveAsExcelFileTasinmaz(buffer:any,fileName:string):void{
        const data : Blob = new Blob([buffer],{type:EXCEL_TYPE});
        FileSaver.saveAs(data,fileName+'_tasinmazlar_'+ new Date().getTime()+EXCEL_EXTENSION);
    }
}