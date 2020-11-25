import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBreadcrumbComponent } from './customBreadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: CustomBreadcrumbComponent;
  let fixture: ComponentFixture<CustomBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
