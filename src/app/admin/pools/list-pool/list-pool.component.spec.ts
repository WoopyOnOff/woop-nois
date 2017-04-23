import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPoolComponent } from './list-pool.component';

describe('ListPoolComponent', () => {
  let component: ListPoolComponent;
  let fixture: ComponentFixture<ListPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
