import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolSelectionComponent } from './pool-selection.component';

describe('PoolSelectionComponent', () => {
  let component: PoolSelectionComponent;
  let fixture: ComponentFixture<PoolSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
