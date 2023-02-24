import { Body, Controller, Delete, Get, Patch } from "@nestjs/common"
import { DeleteResult, UpdateResult } from "typeorm"
import { BankService } from "./bank.service"
import { UpdateBankDto } from "./dto/update-bank.dto"
import { Bank } from "./entities/bank.entity"

@Controller("bank")
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  async getBanks(): Promise<Bank[]> {
    const banks = await this.bankService.findAll()
    return banks
  }

  @Get(":id")
  async getBank(id: string): Promise<Bank> {
    const bank = await this.bankService.findOne(id)
    return bank
  }

  @Patch(":id")
  async updateBank(
    id: string,
    @Body() dto: UpdateBankDto
  ): Promise<UpdateResult> {
    const bank = await this.bankService.update(id, dto)
    return bank
  }

  @Delete(":id")
  async deleteBank(id: string): Promise<DeleteResult> {
    const bank = await this.bankService.delete(id)

    return bank
  }
}
