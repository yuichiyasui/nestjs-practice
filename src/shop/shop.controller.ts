import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateShopDto } from 'src/dto/create-shop.dto';
import { ForbiddenException } from 'src/forbbiden.exception';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Shop } from 'src/interfaces/shop.interface';
import { ShopService } from './shop.service';

@Controller('shop')
@UseFilters(new HttpExceptionFilter())
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto): string {
    throw new ForbiddenException();
    return `「${createShopDto.name}」を作成しました`;
  }

  @Get()
  findAll(): Shop[] {
    throw new ForbiddenException();
    return this.shopService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): string {
    return `お店:${id}`;
  }
}
