import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVotesComponent } from './my-votes.component';

describe('MyVotesComponent', () => {
  let component: MyVotesComponent;
  let fixture: ComponentFixture<MyVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
