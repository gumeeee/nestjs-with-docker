import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  createItem(title: string, description: string): Item {
    const itemExistByTitle = this.items.find((item) => item.title === title);

    if (itemExistByTitle) {
      throw new BadRequestException('Item já existente com titulo informado.');
    }

    const item: Item = {
      id: Math.random().toString(),
      title,
      description,
    };
    this.items.push(item);
    return item;
  }

  getAllItems(): Item[] {
    return [...this.items];
  }

  getItemById(id: string): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException('Item não encontrado.');
    }
    return item;
  }

  updateItem(id: string, title: string, description: string): Item {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    const itemExistByTitle = this.items.find((item) => item.title === title);

    if (itemExistByTitle) {
      throw new BadRequestException('Item já existente com titulo informado.');
    }
    if (itemIndex === -1) {
      throw new NotFoundException('Item não encontrado.');
    }
    const updatedItem = { ...this.items[itemIndex], title, description };
    this.items[itemIndex] = updatedItem;
    return updatedItem;
  }

  deleteItem(id: string): void {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException('Item não encontrado.');
    }
    this.items.splice(itemIndex, 1);
  }
}
