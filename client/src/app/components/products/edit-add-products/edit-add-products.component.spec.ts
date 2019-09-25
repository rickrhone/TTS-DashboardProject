import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddProductsComponent } from './edit-add-products.component';

describe('EditAddProductsComponent', () => {
  let component: EditAddProductsComponent;
  let fixture: ComponentFixture<EditAddProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
