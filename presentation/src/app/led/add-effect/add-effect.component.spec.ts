import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEffectComponent } from './add-effect.component';

describe('AddEffectComponent', () => {
  let component: AddEffectComponent;
  let fixture: ComponentFixture<AddEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
