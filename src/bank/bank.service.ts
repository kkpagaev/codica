import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm"
import { Transaction } from "../transaction/entities/transaction.entity"
import { CreateBankDto } from "./dto/create-bank.dto"
import { UpdateBankDto } from "./dto/update-bank.dto"
import { Bank } from "./entities/bank.entity"

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
    private readonly dataSource: DataSource
  ) {}

  private logger = new Logger(BankService.name)

  async findAll(): Promise<Bank[]> {
    const banks = await this.bankRepository.find()

    return banks
  }

  async findOne(id: string): Promise<Bank> {
    const bank = await this.bankRepository.findOne({
      where: { id },
    })

    return bank
  }

  async create({ name }: CreateBankDto): Promise<Bank> {
    const bank = this.bankRepository.create({ name })

    const result = await this.bankRepository.save(bank)

    return result
  }

  async update(id: string, update: UpdateBankDto): Promise<UpdateResult> {
    const result = await this.bankRepository.update(id, update)

    return result
  }

  async delete(id: string): Promise<DeleteResult> {
    const bank = await this.findOne(id)
    if (!bank) {
      throw new NotFoundException()
    }

    const result = await this.bankRepository.delete(bank)
    return result
  }

  async processTransaction(transaction: Transaction, isDelete = false) {
    this.logger.log(`Processing transaction ${transaction.id}`)

    try {
      await this.dataSource.transaction(async (entityManager) => {
        if (isDelete) {
          await entityManager.delete(Transaction, transaction.id)
        } else {
          await entityManager.save(Transaction, transaction)
        }
        const amount = isDelete ? -transaction.amount : transaction.amount
        await entityManager.update(Bank, transaction.bankId, {
          balance: () => `"balance" ${amount > 0 ? "+" : ""} ${amount}`,
        })
      })

      this.logger.log(`Transaction ${transaction.id} processed`)
    } catch (e) {
      this.logger.error(`Transaction ${transaction.id} failed`, e)
    }
  }
}
