import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-specific-service',
  templateUrl: './view-specific-service.component.html',
  styles: []
})
export class ViewSpecificServiceComponent implements OnInit {
  public specificService;
  public packages;
  public columnsToDisplay= ['id','name'];
  public url=""

  @ViewChild (MatSort, {static : true}) sort : MatSort;
  @ViewChild (MatPaginator, {static  : true}) paginator : MatPaginator;
  constructor(private _route:ActivatedRoute, private _http:HttpService, private _config:ConfigService, private _router:Router) { }
  

  ngOnInit(): void {
    this._route.params.subscribe((response)=>{
      this.url=response['url']
      this.getSpecificService(this.url);
    })
  }
  getSpecificService(url){
    const request={
      activityID:'getSpecificService',
      requestData:{
        url:url
      }
    }
    this._config.spinnerToggle(true, "Retrieving service details...")
    this._http.request(request).subscribe((response)=>{
      this.specificService=response.data;

      this.packages= new MatTableDataSource(response.data.packages);
      this.packages.sort = this.sort;
      this.packages.paginator = this.paginator;
      this._config.spinnerToggle(false)
    })
  }
  searchPackage(value){
    this.packages.filter= value.trim().toLowerCase(); 
  }
  editService(url){
    this._router.navigate(['/dashboard/editService/', url])
  }
}
