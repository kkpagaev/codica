import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ApiTags } from "@nestjs/swagger"
import { DeleteResult } from "typeorm"
import { Pagination } from "../core/reponces/pagination.responce"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { Transaction } from "./entities/transaction.entity"
import { TransactionService } from "./transaction.service"

@Controller("transaction")
@ApiTags("transaction")
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly config: ConfigService
  ) {}

  private logger = new Logger(TransactionController.name)

  @Post("webhook")
  async webhook(
    @Body() dto: CreateTransactionDto,
    @Headers("Authorization") authorizationHeader: string
  ): Promise<void> {
    if (authorizationHeader !== this.config.get("WEBHOOK_SECRET")) {
      this.logger.error("Invalid secret")
      throw new HttpException("Invalid secret", HttpStatus.UNAUTHORIZED)
    }

    await this.transactionService.create(dto)
  }

  @Get()
  async paginate(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<Pagination<Transaction>> {
    const result = await this.transactionService.paginate(page, limit)

    return result
  }

  @Delete(":id")
  async delete(@Query("id") id: string): Promise<DeleteResult> {
    const result = await this.transactionService.delete(id)

    return result
  }
}
