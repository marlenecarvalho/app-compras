import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./item.entity";

@Injectable()
export class ItemsService {
    constructor (@InjectRepository(Item)
  private repo: Repository<Item>,) {}

    
  findAll(): Promise<Item[]> {
    return this.repo.find({ order: { createdAt: 'desc' } });
  }

  create(data: Partial<Item>): Promise<Item> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }


  async delete(id: number) {
    return this.repo.delete(id);
  }
}