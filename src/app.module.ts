import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BankModule } from "./bank/bank.module"
import { Bank } from "./bank/entities/bank.entity"
import { Transaction } from "./transaction/entities/transaction.entity"
import { TransactionModule } from "./transaction/transaction.module"
import { CategoryModule } from "./category/category.module"
import { Category } from "./category/entities/category.entity"

const entities = [Bank, Transaction, Category]
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST") || "127.0.0.1",
        port: +configService.get("DB_PORT") || 7706,
        username: configService.get("DB_USER") || "user",
        password: configService.get("DB_PWD") || "user",
        database: configService.get("DB_NAME") || "db",
        synchronize: true,
        entities: entities,
      }),
      inject: [ConfigService],
    }),
    BankModule,
    TransactionModule,
    CategoryModule,
  ],
})
export class AppModule {}
