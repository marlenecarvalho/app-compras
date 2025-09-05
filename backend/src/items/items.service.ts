import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";

@Injectable()
export class ItemsService {
    constructor (private prisma: PrismaService) {}

    
 create(data: { nome: string; quantidade: number; categoria: string }) {
    return this.prisma.item.create({ data });
  }

  findAll() {
    return this.prisma.item.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
