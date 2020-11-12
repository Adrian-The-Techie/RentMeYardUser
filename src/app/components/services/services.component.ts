import { DialogComponent } from './../../gen-components/dialog/dialog.component';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  public services;
  public servicesData=[];
  public columnsToDisplay= ['id','name', 'action'];
  public servicesOnMobile: any;
  @ViewChild (MatSort, {static : true}) sort : MatSort;
  @ViewChild (MatPaginator, {static  : true}) paginator : MatPaginator;
  
  constructor(private _router:Router, private _http:HttpService, private _config:ConfigService, private _dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getServices()
  }
  goToAddService(){
    this._router.navigate(["/dashboard/addService"])
  }
  getServices(){
    const request={
      activityID:'getServices',
      requestData:{
        token:localStorage.getItem('token')
      }
    }
    this._config.spinnerToggle(true, 'Loading your services...')
    this._http.request(request).subscribe((response)=>{

        this.servicesOnMobile= response.data

        this.servicesData= response.data;
        this.services= new MatTableDataSource(this.servicesData);
        this.services.sort = this.sort;
        this.services.paginator = this.paginator;
        
        
      this._config.spinnerToggle(false)
    })
  }
  searchService(value){
    this.services.filter= value.trim().toLowerCase(); 
  }
  viewService(url){
    this._router.navigate(["/dashboard/services/", url]);
  }
  deleteService(row){
      this._dialog.open(DialogComponent, {data:row.name}).afterClosed().subscribe((response)=>{
      if(response.action != null && response.action == true){
        const request = {
          activityID: "deleteService",
          requestData:{
            id: row.id
          }
        }
        this._config.spinnerToggle(true, `Deleting ${row.name} service...`)
        this._http.request(request).subscribe((response)=>{
          this._config.spinnerToggle(false)
          this._config.showSnackBar(response, 5000)
        })
      }
    });
  }
}
