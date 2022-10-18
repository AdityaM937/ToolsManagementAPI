import { Injectable } from '@nestjs/common';

import { asyncLocalStorage } from './storage';

@Injectable()
export class LoggerHelperService {
  rString = '';

  public getRandomString() {
    return asyncLocalStorage.getStore()?.requestId ?? '';
  }

  public randomString() {
    let result = '';
    const length = 6;
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    this.rString = result;
    return result;
  }
}
