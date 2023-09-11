import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UHeaderComponent } from './u-header.component';

describe('UHeaderComponent', () => {
  let component: UHeaderComponent;
  let fixture: ComponentFixture<UHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UHeaderComponent]
    });
    fixture = TestBed.createComponent(UHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
