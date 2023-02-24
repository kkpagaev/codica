import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateBankDto {
  @IsString()
  @ApiProperty({
    example: "My Bank",
    description: "The name of the bank",
  })
  name: string
}
