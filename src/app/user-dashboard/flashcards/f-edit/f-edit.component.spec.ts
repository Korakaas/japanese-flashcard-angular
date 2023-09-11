import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FEditComponent } from './f-edit.component';

describe('FEditComponent', () => {
  let component: FEditComponent;
  let fixture: ComponentFixture<FEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FEditComponent]
    });
    fixture = TestBed.createComponent(FEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
