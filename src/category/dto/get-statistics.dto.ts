import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsArray, IsUUID, IsDate } from "class-validator"

export class GetStatisticsDto {
  @IsArray()
  @IsUUID("4", { each: true })
  @Transform(
    (value) => {
      const val = value.value
      if (typeof val === "string") {
        return [val]
      }
      return val
    },
    { toClassOnly: true }
  )
  @ApiProperty({
    example: ["4a3d6598-bee3-4035-8b85-6bbc6acf9f10"],
    description: "The ids of the categories",
  })
  categories: string[]
  @IsDate()
  @ApiProperty({
    example: "2021-01-01",
    description: "The start date of the period",
  })
  @Transform((value) => new Date(value.value), { toClassOnly: true })
  fromPeriod: Date
  @IsDate()
  @ApiProperty({
    example: "2021-01-31",
    description: "The end date of the period",
  })
  @Transform((value) => new Date(value.value), { toClassOnly: true })
  toPeriod: Date
}
