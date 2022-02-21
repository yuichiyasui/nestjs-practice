import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateShopDto } from 'src/dto/create-shop.dto';
import { Shop } from 'src/interfaces/shop.interface';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto): string {
    return `「${createShopDto.name}」を作成しました`;
  }

  @Get()
  findAll(): Shop[] {
    return this.shopService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): string {
    return `お店:${id}`;
  }
}
