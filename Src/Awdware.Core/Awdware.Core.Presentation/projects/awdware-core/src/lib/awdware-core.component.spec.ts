import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwdwareCoreComponent } from './awdware-core.component';

describe('AwdwareCoreComponent', () => {
  let component: AwdwareCoreComponent;
  let fixture: ComponentFixture<AwdwareCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwdwareCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwdwareCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
