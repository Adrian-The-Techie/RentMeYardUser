import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: []
})
export class DialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }
  response(){
    const response={
      action: true
    }
    return response;
  }

}
