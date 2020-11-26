import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProgressTextComponent } from './custom-progress-text.component';

describe('BreadcrumbComponent', () => {
  let component: CustomProgressTextComponent;
  let fixture: ComponentFixture<CustomProgressTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomProgressTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProgressTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
