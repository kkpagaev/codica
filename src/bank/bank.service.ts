import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, UpdateResult } from "typeorm"
import { CreateBankDto } from "./dto/create-bank.dto"
import { UpdateBankDto } from "./dto/update-bank.dto"
import { Bank } from "./entities/bank.entity"

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>
  ) {}

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

  async delete(id: string): Promise<Bank> {
    const deletedBank = await this.bankRepository.findOne({
      where: { id },
    })

    await this.bankRepository.delete(id)

    return deletedBank
  }
}
