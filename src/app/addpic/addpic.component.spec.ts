import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpicComponent } from './addpic.component';

describe('AddpicComponent', () => {
  let component: AddpicComponent;
  let fixture: ComponentFixture<AddpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
