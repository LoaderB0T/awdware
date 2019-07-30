import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BaseEvent } from '../models/base-event';
import { InvalidOperationError } from '../models/invalid-operation-error';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly events = {};

  constructor() { }

  public publishEvent<TEvent extends BaseEvent>(type: new () => TEvent, callback?: (value: TEvent) => void): void {
    const eventToPublish = new type();
    if (callback) {
      callback(eventToPublish);
    }

    if (!eventToPublish) {
      throw new InvalidOperationError('Publish method must get event name.');
    } else if (!this.events[eventToPublish.eventName]) {
      return;
    }
    this.events[eventToPublish.eventName].next(eventToPublish);
  }

  public subscribeEvent<T extends BaseEvent>(type: new () => T): Observable<T> {
    const evt = new type();
    const eventName: string = evt.eventName;

    if (this.events[eventName] === undefined) {
      this.events[eventName] = new Subject<T>();
    }
    return this.events[eventName].asObservable();
  }
}
