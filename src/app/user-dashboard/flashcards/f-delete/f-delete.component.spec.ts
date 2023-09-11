import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDeleteComponent } from './f-delete.component';

describe('FDeleteComponent', () => {
  let component: FDeleteComponent;
  let fixture: ComponentFixture<FDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FDeleteComponent]
    });
    fixture = TestBed.createComponent(FDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
