import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
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
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "127.0.0.1",
      port: +process.env.DB_PORT || 7706,
      username: process.env.DB_USER || "user",
      password: process.env.DB_PWD || "user",
      database: process.env.DB_NAME || "db",
      synchronize: true,
      entities: entities,
    }),
    BankModule,
    TransactionModule,
    CategoryModule,
  ],
})
export class AppModule {}
