import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVoteComponent } from './new-vote.component';

describe('NewVoteComponent', () => {
  let component: NewVoteComponent;
  let fixture: ComponentFixture<NewVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
