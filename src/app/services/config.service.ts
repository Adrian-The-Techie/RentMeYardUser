import { SnackbarComponent } from './../gen-components/snackbar/snackbar.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as AOS from 'aos';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public baseUri='https://rentmeyard.herokuapp.com/api/';

  constructor(private _snackBar:MatSnackBar) { }
  
  startAos(){
    AOS.init({
      duration:500
    });
  }
  spinnerToggle(showLoader:boolean, message:string=null){
    let spinner=document.querySelector('.spinner');
    let span = document.createElement('span');
    let messageNode=document.createTextNode(message);
    let contentNode=document.querySelector('.spinner-message');
    if(showLoader){
      span.classList.add('textNodeStyle');
      contentNode.appendChild(span);
      span.appendChild(messageNode)
      spinner.classList.add('open')
    }
    else{
      contentNode.removeChild(contentNode.childNodes[0])
      spinner.classList.remove('open');
      message=null;
    }
    
  }

  showSnackBar(data, duration:number){
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: duration,
      horizontalPosition:'left',
      verticalPosition:'bottom',
      data:data
    });
  }
}




