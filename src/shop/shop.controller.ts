import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateShopDto } from 'src/dto/create-shop.dto';

@Controller('shop')
export class ShopController {
  @Post()
  create(@Body() createShopDto: CreateShopDto): string {
    return `「${createShopDto.name}」を作成しました`;
  }

  @Get(':id')
  findById(@Param('id') id: string): string {
    return `お店:${id}`;
  }
}
