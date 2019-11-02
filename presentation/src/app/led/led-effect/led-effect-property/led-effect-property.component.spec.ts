import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedEffectPropertyComponent } from './led-effect-property.component';

describe('LedEffectPropertyComponent', () => {
  let component: LedEffectPropertyComponent;
  let fixture: ComponentFixture<LedEffectPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedEffectPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedEffectPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
