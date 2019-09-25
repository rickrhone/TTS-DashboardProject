import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddCategoriesComponent } from './edit-add-categories.component';

describe('EditAddCategoriesComponent', () => {
  let component: EditAddCategoriesComponent;
  let fixture: ComponentFixture<EditAddCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
