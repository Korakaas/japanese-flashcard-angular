import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableComponent } from './unavailable.component';

describe('UnavailableComponent', () => {
  let component: UnavailableComponent;
  let fixture: ComponentFixture<UnavailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnavailableComponent]
    });
    fixture = TestBed.createComponent(UnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
