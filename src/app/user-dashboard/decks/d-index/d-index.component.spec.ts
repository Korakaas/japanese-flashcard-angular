import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIndexComponent } from './d-index.component';

describe('DIndexComponent', () => {
  let component: DIndexComponent;
  let fixture: ComponentFixture<DIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DIndexComponent]
    });
    fixture = TestBed.createComponent(DIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
