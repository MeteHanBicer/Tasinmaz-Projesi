export class TasinmazModel {
    tasinmazlar : Array<Tasinmaz>;
    iller:Array<Il>;
    ilceler:Array<Ilce>;
    mahalleler:Array<Mahalle>;
    constructor() {
    }
}
export class Tasinmaz{
    id : number;
    ilId : number;
    ilAd:string;
    ilceAd:string;
    ilceId : number;
    Mahalle:Mahalle;
    Ilce:Ilce;
    Il:Il;
    ada : number;
    mahalleId:number;
    mahalle:string;
    parsel : number;
    nitelik : number; 
    constructor(id:number,ilId:number,ilceId:number,mahalleId:number,ada:number,parsel:number,nitelik:number) {
                this.id=id;
                this.ilId=ilId;
                this.ilceId=ilceId;
                this.mahalleId=mahalleId;
                this.ada=ada;
                this.parsel=parsel;
                this.nitelik=nitelik;           
    }
}
export class Il{
    id:number;
    ad:string;
    illeritems:[];
    Ilce: Ilce[];
    ilce:Ilce;

constructor(id:number,ad:string) {
this.id=id;
this.ad=ad;
}
}

export class Ilce{
    id:number;
    ad:string;
    ilid:number;
    ilceleritems:[];
    Il:Il;

constructor(id:number,ad:string,ilid:number) {
this.id=id;
this.ad=ad;
this.ilid=ilid;
}
}

export class Mahalle{
    id:number;
    ad:string;
    ilceid:number;
    mahalleleritems:[];
    Ilce:Ilce;
    ilce:string;

constructor(id:number,ad:string,ilid:number,ilce:string) {
this.id=id;
this.ad=ad;
this.ilceid=ilid;
}
}