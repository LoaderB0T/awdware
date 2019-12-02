import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushyComponent } from './pushy.component';

describe('PushyComponent', () => {
  let component: PushyComponent;
  let fixture: ComponentFixture<PushyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
