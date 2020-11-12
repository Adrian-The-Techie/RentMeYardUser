import { HttpService } from './../../services/http.service';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {
  public signUpForm:FormGroup;
  public showPassword:boolean = false;
  public showConfirmPassword= false;

  constructor(private _config:ConfigService, 
              private _http:HttpService, 
              private _fb:FormBuilder, 
              private _router:Router) { }

  ngOnInit(): void {
    this._config.startAos();
    this.genForm();
  }
  genForm(){
    return this.signUpForm= this._fb.group({
      fullNames:new FormControl('', Validators.required),
      email:new FormControl('', [Validators.required]),
      phone:new FormControl('+254', [Validators.required, Validators.minLength(13)]),
      username:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      confirmPassword:new FormControl('', [Validators.required])
    })
  }

  matchPassword(controls: AbstractControl): {[key:string]: any} | null{
    if (this.signUpForm.controls['password'].value != controls.value){
      return {'passwordMatched': false}
    }
    else{
      return null
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
  toggleConfirmPasswordVisibility(){
    var confirmPasswordElement= document.querySelector("#confirmPassword")
    if(!this.showConfirmPassword){
      confirmPasswordElement.setAttribute('type', 'text')

      this.showConfirmPassword= true;
    }
    else{
      confirmPasswordElement.setAttribute('type', 'password')

      this.showConfirmPassword=false
    }
  }
  signUp(){
    console.log(this.signUpForm.errors)
    if(this.signUpForm.valid){
      const request={
        activityID:'signUp',
        requestData:this.signUpForm.value
      }
      this._config.spinnerToggle(true, "Signing in");
      this._http.request(request).subscribe((response)=>{
        this._config.spinnerToggle(false);
        this._config.showSnackBar(response, 5000);
        if (response.status == 1){
          this._router.navigate(['/login']);
        }
      });
    }
  }
}
