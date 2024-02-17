/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "items";

export interface Items {
  items: Item[];
}

export interface Empty {
}

export interface GetItemRequest {
  id: string;
}

export interface CreateItemRequest {
  name: string;
  quantity: number;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
}

export const ITEMS_PACKAGE_NAME = "items";

export interface ItemsServiceClient {
  createItem(request: CreateItemRequest): Observable<Item>;

  getItem(request: GetItemRequest): Observable<Item>;

  streamItems(request: Empty): Observable<Items>;
}

export interface ItemsServiceController {
  createItem(request: CreateItemRequest): Promise<Item> | Observable<Item> | Item;

  getItem(request: GetItemRequest): Promise<Item> | Observable<Item> | Item;

  streamItems(request: Empty): Observable<Items>;
}

export function ItemsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createItem", "getItem", "streamItems"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ItemsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ItemsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEMS_SERVICE_NAME = "ItemsService";
