import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { ParamUUID } from "../core/decorators/param-uuid.decorator"
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { GetStatisticsDto } from "./dto/get-statistics.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("stats")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  )
  async statistics(
    @Query() { categories, fromPeriod, toPeriod }: GetStatisticsDto
  ) {
    const result = await this.categoryService.statistics(
      categories,
      fromPeriod,
      toPeriod
    )

    return result.map(({ name, amount }) => ({ [name]: amount }))
  }
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(":id")
  findOne(@ParamUUID() id: string) {
    return this.categoryService.findOne(id)
  }

  @Patch(":id")
  update(
    @ParamUUID() id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  @Delete(":id")
  remove(@ParamUUID() id: string) {
    return this.categoryService.delete(id)
  }
}
