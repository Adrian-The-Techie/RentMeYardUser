import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { ConfigService } from './../../services/config.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styles: []
})
export class ServiceFormComponent implements OnInit {
  public serviceForm:FormGroup;
  categories=[];
  packages:FormArray;
  packageForm:FormGroup;
  public url="";
  public title="";
  constructor(private _fb:FormBuilder, private _config:ConfigService, private _http:HttpService, private _router:Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this._route.params.subscribe((params)=>{
      if(params['url'] != null){
        this.url=params['url']
        this.getService(this.url)
      }
      else{
        this.genForm('new');
      }
    })    
  }
  getService(url){
    const request={
      activityID:'getSpecificService',
      requestData:{
        url:url
      }
    }
    this._http.request(request).subscribe((response)=>{
      if(response.status === 1){
        this.genForm('edit', response.data)
      }
    })
  }
  genForm(type, data=null){
    if(type == 'edit'){
      this.title=data.name
      this.serviceForm= this._fb.group({
        id:data.id,
        thumbnail:new FormControl(data.thumbnail, Validators.required),
        name:new FormControl(data.name, Validators.required),
        category:new FormControl(data.category_id, Validators.required),
        normalRate:new FormControl(data.normal_rate, Validators.required),
        description:new FormControl(data.description, [Validators.required, Validators.maxLength(20)]),
        negotiable:data.negotiable,
        hasPackages:data.has_packages,
        user:localStorage.getItem('token'),
        packages:this._fb.array([])
      })
      if(data.has_packages){
          this.packages=this.serviceForm.get('packages') as FormArray
          for(let value of data.packages){
              this.packages.push(this.package('edit', value))
          }
      }
      
      return this.serviceForm
    }
    else{
      this.title="New service"
      return this.serviceForm= this._fb.group({
        id:"",
        thumbnail:new FormControl('', Validators.required),
        name:new FormControl('', Validators.required),
        category:"",
        normalRate:new FormControl('', Validators.required),
        description:new FormControl('', [Validators.required, Validators.maxLength(20)]),
        negotiable:false,
        hasPackages:false,
        user:localStorage.getItem('token'),
        packages:this._fb.array([this.package('new')])
      })
    }
    
  }
  getCategories(){
    this._config.spinnerToggle(true, "Loading...");
    this._http.request({activityID: 'getCategories'}).subscribe((response)=>{
      this.categories=response.data;
      this._config.spinnerToggle(false);
    })
  }
  package(type, data=null){
    if(type=='edit'){
      return this.packageForm = this._fb.group({
        id:data.id,
        name:new FormControl(data.condition, Validators.required),
        rate: new FormControl(data.rate, Validators.required)
      })
    }
    else{
        return this.packageForm = this._fb.group({
          id:"",
          name:new FormControl('', Validators.required),
          rate: new FormControl('', Validators.required)
      })
    }
    
  }
  newPackage(){
    this.packages=this.serviceForm.get('packages') as FormArray;
    this.packages.push(this.package('new'));
  }
  removePackage(index){
    this.packages.removeAt(index);
  }
  addService(action=null){
    const request={
      activityID:'addService',
      requestData:this.serviceForm.value
    }
    this._config.spinnerToggle(true, "Saving service...");
    this._http.request(request).subscribe((response)=>{
      this._config.spinnerToggle(false);
      this._config.showSnackBar(response, 4000)
      if(action=="saveAndNew" && response.status == 1){
        this.serviceForm.patchValue({
          id:"",
          thumbnail:new FormControl('', Validators.required),
          name:new FormControl('', Validators.required),
          category:"",
          normalRate:new FormControl('', Validators.required),
          description:new FormControl('', [Validators.required, Validators.maxLength(20)]),
          negotiable:false,
          hasPackages:false,
          user:localStorage.getItem('token'),
          packages:this._fb.array([this.newPackage()])
        })
      }
      else{
        this._router.navigate(['/dashboard/services'])
      }
    })
  }
  updateService(action=null){
    const request={
      activityID:'updateService',
      requestData:this.serviceForm.value
    }
    this._config.spinnerToggle(true, "Updating service...");
    this._http.request(request).subscribe((response)=>{
      this._config.spinnerToggle(false);
      this._config.showSnackBar(response, 4000)
    })
  }
}
