import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  public mode='over';
  public hasBackdrop='true'
  // public hamb
  public showMenu=true;
  public sidenavState=false;
  constructor() { }

  ngOnInit(): void {
    this.conditionalStyling();
  }

  conditionalStyling(){
    if(window.matchMedia("(min-width:900px)").matches){
      this.mode='push'
      this.hasBackdrop='false';
      this.sidenavState= true;
    }
  }
}
