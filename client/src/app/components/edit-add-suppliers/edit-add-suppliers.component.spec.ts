import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddSuppliersComponent } from './edit-add-suppliers.component';

describe('EditAddSuppliersComponent', () => {
  let component: EditAddSuppliersComponent;
  let fixture: ComponentFixture<EditAddSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
