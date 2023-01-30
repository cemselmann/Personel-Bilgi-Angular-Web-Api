import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-per',
  templateUrl: './show-per.component.html',
  styleUrls: ['./show-per.component.css']
})
export class ShowPerComponent implements OnInit {
DepartmanFilter: any;
GirisTarihiFilter: any;

  constructor(private service:SharedService) { }
  PersonelList:any=[];

  ModalTitle: string | undefined;
  ActivateAddEditPerComp:boolean=false;
  per:any;

  PersonelIdFilter:string="";
  PersonelAdFilter:string="";
  PersonelListWithoutFilter:any=[];

  ngOnInit(): void { 
    
    this.refreshPerList();//component çağrıldığında çalışır!
    
  }

  addClick(){
    this.per={
      PersonelId:0,
      PersonelAd:"",
      Departman:"",
      GirisTarihi:"",
      FotografAd:"genel.png"

    }
    this.ModalTitle="Personel Ekle";
    this.ActivateAddEditPerComp=true;
  }
  editClick(item: any){
    this.per=item;
    this.ModalTitle="Personel Düzenle";
    this.ActivateAddEditPerComp=true;
  }
  deleteClick(item: { PersonelId: any; }): void{
    if(confirm('Emin misiniz?')){
      this.service.deletePersonel(item.PersonelId).subscribe(data=>{
        alert(data.toString());
        this.refreshPerList();
      })
    }
  }
  closeClick(){
    this.ActivateAddEditPerComp=false;
    this.refreshPerList();
  }


  refreshPerList(){
    this.service.getPerList().subscribe(data=>{

      this.PersonelList=data;
    });
  }
  FilterFn(){
    var PersonelIdFilter=this.PersonelIdFilter;
    var PersonelAdFilter=this.PersonelAdFilter;

    this.PersonelList=this.PersonelListWithoutFilter.filter(
        function(el: { PersonelId: { toString: () => string; }; PersonelAd: { toString: () => string; }; }){
            return el.PersonelId.toString().toLowerCase().includes(
                PersonelIdFilter.toString().trim().toLowerCase()
            )&&
            el.PersonelAd.toString().toLowerCase().includes(
               PersonelAdFilter.toString().trim().toLowerCase()
            )
        });
}
sortResult(prop:any,asc:any){
  this.PersonelList = this.PersonelListWithoutFilter.sort(function(a:any,b:any){
    if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
    }
     
    else{
      return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}

}


