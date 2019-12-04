import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedEffectComponent } from './led-effect.component';

describe('LedEffectComponent', () => {
  let component: LedEffectComponent;
  let fixture: ComponentFixture<LedEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
