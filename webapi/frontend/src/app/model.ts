export class Model {

    kullanicilar : Array<Kullanici>;
    loglar:Array<Log>;
    
    constructor() {
    }
}

export class Kullanici{
    id : number;
    ad : string;
    soyad : string;
    email : string;
    sifre : string;
    adres : string;
    rol : string; 
    count: number;
    pageIndex: number;
    pageSize: number;
    items:[];
    constructor(id:number,ad:string,soyad:string,email:string,sifre:string,adres:string,rol:string) {
                this.id=id;
                this.ad=ad;
                this.soyad=soyad;
                this.email=email;
                this.sifre=sifre;
                this.adres=adres;
                this.rol=rol;
    }
}
export class Log{
    id:number;
    durum:string;
    islemTipi:string;
    tarihSaat:number;
    ip:number;
    aciklama:string;
    constructor(id:number,durum:string,islemTipi:string,tarihSaat:number,ip:number,aciklama:string){
        this.id=id;
        this.durum=durum;
        this.islemTipi=islemTipi;
        this.tarihSaat=tarihSaat;
        this.ip=ip;
        this.aciklama=aciklama;
    }
}


