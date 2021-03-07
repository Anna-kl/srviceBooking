import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStafComponent } from './update-staf.component';

describe('UpdateStafComponent', () => {
  let component: UpdateStafComponent;
  let fixture: ComponentFixture<UpdateStafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
