import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsUUID } from "class-validator"
import { TransactionType } from "../entities/transaction.entity"

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100,
    description: "The amount of the transaction",
  })
  amount: number

  @IsNotEmpty()
  @IsEnum(TransactionType)
  @ApiProperty({
    example: TransactionType.PROFITABLE,
    description: "The type of the transaction",
  })
  type: TransactionType

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "b0d7b0d0-9d7b-4b6d-8e3d-3dcb9a4f7f63",
    description: "The id of the bank",
  })
  bankId: string

  @IsArray()
  @IsUUID("4", { each: true })
  @ApiProperty({
    example: ["b0d7b0d0-9d7b-4b6d-8e3d-3dcb9a4f7f63"],
    description: "The ids of the categories",
  })
  categories: string[]
}
