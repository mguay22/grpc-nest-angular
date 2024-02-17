import { Controller } from '@nestjs/common';
import {
  CreateItemRequest,
  GetItemRequest,
  Item,
  Items,
  ItemsServiceController,
  ItemsServiceControllerMethods,
} from './items';
import { ItemsService } from './items.service';
import { Observable } from 'rxjs';

@Controller('items')
@ItemsServiceControllerMethods()
export class ItemsController implements ItemsServiceController {
  constructor(private readonly itemsService: ItemsService) {}

  getItem(request: GetItemRequest): Item | Promise<Item> | Observable<Item> {
    return this.itemsService.getItem(request);
  }

  createItem(
    request: CreateItemRequest,
  ): Item | Promise<Item> | Observable<Item> {
    return this.itemsService.createItem(request);
  }

  streamItems(): Observable<Items> {
    return this.itemsService.streamItems();
  }
}
