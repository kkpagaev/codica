import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class CreateCategoryDto {
  @ApiProperty({
    example: "My Category",
    description: "The name of the category",
  })
  @IsString()
  @IsNotEmpty()
  name: string
  @ApiProperty({
    example: "My Bank",
    description: "The name of the bank",
  })
  @IsString()
  @IsNotEmpty()
  description: string
}
