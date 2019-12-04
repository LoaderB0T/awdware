import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedSettingComponent } from './led-setting.component';

describe('LedSettingComponent', () => {
  let component: LedSettingComponent;
  let fixture: ComponentFixture<LedSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
