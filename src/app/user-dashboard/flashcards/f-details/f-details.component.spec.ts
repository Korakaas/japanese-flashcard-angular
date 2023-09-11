import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDetailsComponent } from './f-details.component';

describe('FDetailsComponent', () => {
  let component: FDetailsComponent;
  let fixture: ComponentFixture<FDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FDetailsComponent]
    });
    fixture = TestBed.createComponent(FDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
