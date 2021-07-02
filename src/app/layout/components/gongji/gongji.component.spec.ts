import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GongjiComponent } from './gongji.component';

describe('GongjiComponent', () => {
  let component: GongjiComponent;
  let fixture: ComponentFixture<GongjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GongjiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GongjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
