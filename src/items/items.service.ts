import { Injectable } from '@nestjs/common';
import { CreateItemRequest, GetItemRequest, Item, Items } from './items';
import { randomUUID } from 'crypto';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];
  private readonly itemsSubject = new BehaviorSubject<Items>({ items: [] });

  createItem(request: CreateItemRequest) {
    const item: Item = {
      id: randomUUID(),
      ...request,
    };
    this.items.push(item);
    this.itemsSubject.next({
      items: this.items,
    });
    return item;
  }

  getItem(request: GetItemRequest) {
    return this.items.find((item) => item.id === request.id);
  }

  streamItems() {
    return this.itemsSubject.asObservable();
  }
}
