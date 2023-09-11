import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTestComponent } from './d-test.component';

describe('DTestComponent', () => {
  let component: DTestComponent;
  let fixture: ComponentFixture<DTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DTestComponent]
    });
    fixture = TestBed.createComponent(DTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
