import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvataAreaComponent } from './avata-area.component';

describe('AvataAreaComponent', () => {
  let component: AvataAreaComponent;
  let fixture: ComponentFixture<AvataAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvataAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvataAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
