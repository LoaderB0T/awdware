import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPushyLobbyComponent } from './join-pushy-lobby.component';

describe('JoinPushyLobbyComponent', () => {
  let component: JoinPushyLobbyComponent;
  let fixture: ComponentFixture<JoinPushyLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinPushyLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPushyLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
