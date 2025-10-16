import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Delete } from '@nestjs/common';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

@Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }


  @Post()
  create(@Body() data: Partial<Item>): Promise<Item> {
    return this.itemsService.create(data);
  }

 @Delete('/:id')
 delete(@Param('id') id: number) {
    return this.itemsService.delete(id);
  }
}
