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
  Res,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ApiHeader, ApiTags } from "@nestjs/swagger"
import { CreateTransactionDto } from "./dto/create-transaction.dto"
import { TransactionService } from "./transaction.service"
import { Response } from "express"

@Controller("transaction")
@ApiTags("transaction")
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly config: ConfigService
  ) {}

  private logger = new Logger(TransactionController.name)

  @Post("webhook")
  @ApiHeader({
    name: "X-Access-Key",
    example: "123",
  })
  async webhook(
    @Body() dto: CreateTransactionDto,
    @Headers("X-Access-Key") authorizationHeader: string
  ): Promise<void> {
    if (authorizationHeader !== this.config.get("WEBHOOK_SECRET")) {
      this.logger.error("Invalid secret")
      throw new HttpException("Invalid secret", HttpStatus.UNAUTHORIZED)
    }

    await this.transactionService.create(dto)
  }

  @Get("/")
  async paginate(
    @Query("page") page: number,
    @Query("limit") limit: number,
    @Res() res: Response
  ) {
    const result = await this.transactionService.paginate(page, limit)

    return res.json(result).status(200)
  }

  @Delete(":id")
  async delete(@Query("id") id: string) {
    await this.transactionService.delete(id)

    return {
      message: "Transaction deleted successfully",
      id: id,
    }
  }
}
