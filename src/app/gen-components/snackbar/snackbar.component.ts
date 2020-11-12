import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styles: []
})
export class SnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data) { }

  ngOnInit(): void {
  }
  conditionalFormatting(status){
    let color="";
    if(status === 1){
      color="text-success"
    }
    else{
      color="text-danger"
    }
    return color;
  }
}
