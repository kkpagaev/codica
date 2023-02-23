import { IsString } from "class-validator"

export class CreateBankDto {
  @IsString()
  name: string
}
