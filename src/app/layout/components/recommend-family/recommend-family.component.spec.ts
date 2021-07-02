import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendFamilyComponent } from './recommend-family.component';

describe('RecommendFamilyComponent', () => {
  let component: RecommendFamilyComponent;
  let fixture: ComponentFixture<RecommendFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
