import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FIndexComponent } from './f-index.component';

describe('FIndexComponent', () => {
  let component: FIndexComponent;
  let fixture: ComponentFixture<FIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FIndexComponent]
    });
    fixture = TestBed.createComponent(FIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
