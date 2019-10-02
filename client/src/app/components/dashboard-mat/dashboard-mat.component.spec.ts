import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMatComponent } from './dashboard-mat.component';

describe('DashboardMatComponent', () => {
  let component: DashboardMatComponent;
  let fixture: ComponentFixture<DashboardMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
