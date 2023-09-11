import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SDeckComponent } from './s-deck.component';

describe('SDeckComponent', () => {
  let component: SDeckComponent;
  let fixture: ComponentFixture<SDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SDeckComponent]
    });
    fixture = TestBed.createComponent(SDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
