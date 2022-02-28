import { BaseEvent } from '@awdware/shared';

export class ToolbarInvalidatedEvent extends BaseEvent {
  constructor() {
    super('ToolbarInvalidated');
  }
}
