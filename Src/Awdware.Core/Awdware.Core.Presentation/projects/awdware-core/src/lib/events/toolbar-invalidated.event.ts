import { BaseEvent } from '../models/base-event';

export class ToolbarInvalidatedEvent extends BaseEvent {
  constructor() {
    super('ToolbarInvalidated');
  }
}
