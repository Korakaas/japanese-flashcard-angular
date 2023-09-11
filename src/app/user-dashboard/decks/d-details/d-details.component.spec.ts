import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DDetailsComponent } from './d-details.component';

describe('DDetailsComponent', () => {
  let component: DDetailsComponent;
  let fixture: ComponentFixture<DDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DDetailsComponent]
    });
    fixture = TestBed.createComponent(DDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
