import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDeleteComponent } from './d-delete.component';

describe('DDeleteComponent', () => {
  let component: DDeleteComponent;
  let fixture: ComponentFixture<DDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DDeleteComponent]
    });
    fixture = TestBed.createComponent(DDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
