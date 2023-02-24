import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { UpdateResult } from "typeorm"
import { ParamUUID } from "../core/decorators/param-uuid.decorator"
import { BankService } from "./bank.service"
import { CreateBankDto } from "./dto/create-bank.dto"
import { UpdateBankDto } from "./dto/update-bank.dto"
import { Bank } from "./entities/bank.entity"

@Controller("bank")
@ApiTags("bank")
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  async getBanks(): Promise<Bank[]> {
    const banks = await this.bankService.findAll()
    return banks
  }

  @Post()
  async createBank(@Body() dto: CreateBankDto): Promise<Bank> {
    const bank = await this.bankService.create(dto)
    return bank
  }

  @Get(":id")
  async getBank(@ParamUUID() id: string): Promise<Bank> {
    const bank = await this.bankService.findOne(id)
    return bank
  }

  @Put(":id")
  async updateBank(
    @ParamUUID() id: string,
    @Body() dto: UpdateBankDto
  ): Promise<UpdateResult> {
    const bank = await this.bankService.update(id, dto)
    return bank
  }

  @Delete(":id")
  async deleteBank(@ParamUUID() id: string) {
    await this.bankService.delete(id)

    return {
      message: "Bank deleted successfully",
      id: id,
    }
  }
}
