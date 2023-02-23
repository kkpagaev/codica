import { Test, TestingModule } from "@nestjs/testing"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"

const mockCategoryService = () => ({})

describe("CategoryController", () => {
  let controller: CategoryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        { provide: CategoryService, useValue: mockCategoryService() },
      ],
    }).compile()

    controller = module.get<CategoryController>(CategoryController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
