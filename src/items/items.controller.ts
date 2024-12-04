import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entity/item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  createItem(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Item {
    return this.itemsService.createItem(title, description);
  }

  @Get()
  getAllItems(): Item[] {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  getItemById(@Param('id') id: string): Item {
    return this.itemsService.getItemById(id);
  }

  @Patch(':id')
  updateItem(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Item {
    return this.itemsService.updateItem(id, title, description);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): void {
    this.itemsService.deleteItem(id);
  }
}
