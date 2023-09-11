import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SGlobalComponent } from './s-global.component';

describe('SGlobalComponent', () => {
  let component: SGlobalComponent;
  let fixture: ComponentFixture<SGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SGlobalComponent]
    });
    fixture = TestBed.createComponent(SGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
