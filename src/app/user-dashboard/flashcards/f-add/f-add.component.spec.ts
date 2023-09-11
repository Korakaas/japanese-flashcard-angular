import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAddComponent } from './f-add.component';

describe('FAddComponent', () => {
  let component: FAddComponent;
  let fixture: ComponentFixture<FAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FAddComponent]
    });
    fixture = TestBed.createComponent(FAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
