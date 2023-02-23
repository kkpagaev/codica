import { Module } from "@nestjs/common"
import { TransactionService } from "./transaction.service"
import { TransactionController } from "./transaction.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Transaction } from "./entities/transaction.entity"
import { BankModule } from "../bank/bank.module"

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), BankModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
