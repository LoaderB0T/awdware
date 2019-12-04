import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePushyLobbyComponent } from './create-pushy-lobby.component';

describe('CreatePushyLobbyComponent', () => {
  let component: CreatePushyLobbyComponent;
  let fixture: ComponentFixture<CreatePushyLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePushyLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePushyLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
