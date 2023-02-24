import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"
import { Category } from "./entities/category.entity"

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto)

    const result = await this.categoryRepository.save(category)

    return result
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find()

    return categories
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    })

    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, updateCategoryDto)

    return result
  }

  async delete(id: string) {
    const result = await this.categoryRepository.delete(id)

    return result
  }
}
