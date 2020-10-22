import { Injectable } from '@angular/core';
import { ToolbarItem } from '../models/toolbar-item';
import { PossibleToolbarItem } from '../models/possible-toolbar-item';
import { EventService } from './event.service';
import { ToolbarInvalidatedEvent } from '../events/toolbar-invalidated.event';

@Injectable({
  providedIn: 'root'
})
export class ToolbarProviderService {

  private readonly possibleToolbarItems: PossibleToolbarItem[] = new Array<PossibleToolbarItem>();
  public activeItem: string;

  constructor(private readonly eventService: EventService) { }

  public addItems(items: PossibleToolbarItem[]) {
    items.forEach(x => this.addItem(x));
  }

  public addItem(item: PossibleToolbarItem) {
    if (!this.possibleToolbarItems.some(x => x.text === item.text)) {
      this.possibleToolbarItems.push(item);
      this.eventService.publishEvent<ToolbarInvalidatedEvent>(ToolbarInvalidatedEvent);
    }
  }

  public getItems(): ToolbarItem[] {
    const toolbarItems = new Array<ToolbarItem>();
    this.possibleToolbarItems.forEach(possibleToolbarItem => {
      if (possibleToolbarItem.enabled()) {
        const newItem = new ToolbarItem(possibleToolbarItem.text, possibleToolbarItem.icon, possibleToolbarItem.action);
        toolbarItems.push(newItem);
      }
    });
    return toolbarItems;
  }
}
