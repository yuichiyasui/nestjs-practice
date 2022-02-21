import { Injectable } from '@nestjs/common';
import { Shop } from 'src/interfaces/shop.interface';

@Injectable()
export class ShopService {
  private readonly shops: Shop[] = [];

  createShop(shop: Shop): string {
    this.shops.push(shop);
    return `「${shop.name}」を作成しました`;
  }

  findAll(): Shop[] {
    return this.shops;
  }

  findById(id: string): string {
    return `お店:${id}`;
  }
}
