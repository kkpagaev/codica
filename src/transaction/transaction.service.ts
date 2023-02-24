import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BankService } from "../bank/bank.service"
import { Category } from "../category/entities/category.entity"
import { Pagination } from "../core/reponces/pagination.responce"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private bankService: BankService
  ) {}

  async paginate(
    page: number,
    limit: number
  ): Promise<Pagination<Transaction>> {
    const [transactions, total] = await this.transactionRepository.findAndCount(
      {
        skip: (page - 1) * limit,
        take: limit,
      }
    )

    return {
      items: transactions,
      total,
      page,
      limit,
    }
  }

  async create({ amount, type, bankId, categories }: CreateTransactionDto) {
    const transaction = new Transaction()
    transaction.amount = amount
    transaction.type = type
    transaction.bankId = bankId
    transaction.categories = categories.map((id) => ({ id } as Category))

    await this.bankService.processTransaction(transaction)
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    })

    return transaction
  }

  async delete(id: string) {
    const transaction = await this.findOne(id)

    const result = await this.bankService.processTransaction(transaction, true)

    return result
  }
}
