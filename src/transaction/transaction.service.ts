import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Transaction } from "./entities/transaction.entity"

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) {}

  async paginate(page: number, limit: number) {
    const [transactions, total] = await this.transactionRepository.findAndCount(
      {
        skip: (page - 1) * limit,
        take: limit,
      }
    )

    return {
      transactions,
      total,
      page,
      limit,
    }
  }

  async create(transaction: Transaction) {
    const result = await this.transactionRepository.save(transaction)
    return result
  }

  async delete(id: string) {
    const result = await this.transactionRepository.delete(id)
    return result
  }
}
