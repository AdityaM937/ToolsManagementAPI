import { AsyncLocalStorage } from 'async_hooks';

export class Store {
  requestId: string;
  constructor(requestId: string) {
    this.requestId = requestId;
  }
}

export const asyncLocalStorage = new AsyncLocalStorage<Store>();
