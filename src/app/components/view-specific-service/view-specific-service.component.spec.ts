import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificServiceComponent } from './view-specific-service.component';

describe('ViewSpecificServiceComponent', () => {
  let component: ViewSpecificServiceComponent;
  let fixture: ComponentFixture<ViewSpecificServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpecificServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
