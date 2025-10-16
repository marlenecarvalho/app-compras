import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { Item } from './items/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'amorim',
    database: 'compras',
    entities: [Item],
    synchronize: true,
  }),
  ItemsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
