import { Controller, Get, Post, Body, Patch, Delete } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { ParamUUID } from "src/core/decorators/param-uuid.decorator"
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"

@Controller("category")
@ApiTags("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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
