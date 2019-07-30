import { BaseEvent } from '../models/base-event';

export class ToolbarInvalidated extends BaseEvent {
  constructor() {
    super('ToolbarInvalidated');
  }
}
