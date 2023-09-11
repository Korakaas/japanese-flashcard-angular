import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DEditComponent } from './d-edit.component';

describe('DEditComponent', () => {
  let component: DEditComponent;
  let fixture: ComponentFixture<DEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DEditComponent]
    });
    fixture = TestBed.createComponent(DEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
