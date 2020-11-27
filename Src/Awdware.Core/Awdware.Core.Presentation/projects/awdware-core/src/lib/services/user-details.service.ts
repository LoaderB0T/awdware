import { Injectable } from '@angular/core';
import { ToolbarInvalidatedEvent } from '../events/toolbar-invalidated.event';
import { UserDetailsDto } from '../models/application-facade';
import { UserDetails } from '../models/user-details';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  public userInfo: UserDetails;
  private readonly _eventService: EventService;

  constructor(eventService: EventService) {
    this._eventService = eventService;
    this.userInfo = new UserDetails();
  }

  public isLoggedIn(): boolean {
    return this.userInfo && true;
  }

  clearUser() {
    Object.keys(this.userInfo).forEach(key => {
      this.userInfo[key] = null;
    });
    this._eventService.publishEvent<ToolbarInvalidatedEvent>(ToolbarInvalidatedEvent);
  }

  setUser(userInfo: UserDetailsDto) {
    this.userInfo.userId = userInfo.userId;
    this.userInfo.username = userInfo.username;
    this.userInfo.lastname = userInfo.lastname;
    this.userInfo.firstname = userInfo.firstname;
    this.userInfo.email = userInfo.email;
    this.userInfo.permission = userInfo.permission;
    this._eventService.publishEvent<ToolbarInvalidatedEvent>(ToolbarInvalidatedEvent);
  }
}
