import { Controller, Post, Body, Get } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  create(@Body() payload: { nome: string; quantidade: number; categoria: string }) {
    return this.itemsService.create(payload);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}
