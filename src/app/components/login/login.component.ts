import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup;
  public showPassword:boolean = false;
  constructor(private _config:ConfigService, private _fb:FormBuilder, private _http:HttpService, private _router:Router) { }

  ngOnInit(): void {
    this._config.startAos();
    this.genForm()
    // this.getLocation()
  }
  genForm(){
    
    return this.loginForm = this._fb.group({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('', Validators.required),
      location:'',
      device_info:navigator.userAgent
    })
  }
  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.savePosition, this.showError);
    }
  }
  savePosition(position){
    this.loginForm.patchValue({
      location:`${position.coords.latitude}, ${position.coords.longitude}`
    });
  }
  showError(error){
    this.loginForm.patchValue({
      location: error.PERMISSION_DENIED? "Not provided": 
      error.POSITION_UNAVAILABLE? "Unavailable":
      error.TIMEOUT? "Timed out":
      "Unknown error"
    });
  }
  login(){
    if(this.loginForm.valid){
      this._config.spinnerToggle(true, "Logging in...");
      const request={
        activityID: 'login',
        requestData:this.loginForm.value
      }
      this._http.request(request).subscribe((response)=>{
        this._config.spinnerToggle(false);
        this._config.showSnackBar(response, 5000)
        if(response.status == 1){
          localStorage.setItem('login_id', response.login_id),
          localStorage.setItem('token', response.token)
          this._router.navigate(['/dashboard'])
        }
      })
    }
  }
  togglePasswordVisibility(){
    var passwordElement= document.querySelector("#password")
    if(!this.showPassword){
      passwordElement.setAttribute('type', 'text')
      this.showPassword= true;
    }
    else{
      passwordElement.setAttribute('type', 'password')

      this.showPassword=false
    }
  }
}
