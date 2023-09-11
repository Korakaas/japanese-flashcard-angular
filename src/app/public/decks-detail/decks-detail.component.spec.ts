import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecksDetailComponent } from './decks-detail.component';

describe('DecksDetailComponent', () => {
  let component: DecksDetailComponent;
  let fixture: ComponentFixture<DecksDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecksDetailComponent]
    });
    fixture = TestBed.createComponent(DecksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
