import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { DataSource } from "typeorm"
import { BankService } from "./bank.service"
import { Bank } from "./entities/bank.entity"

export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    transaction: jest.fn(),
  })
)

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{
    [key: string]: any
  }>
}
const mockBankRepository = () => ({
  find: jest.fn().mockResolvedValue([
    {
      id: "1",
      name: "Bank 1",
      balance: 100,
    },
    {
      id: "2",
      name: "Bank 2",
      balance: 200,
    },
    {
      id: "3",
      name: "Bank 3",
      balance: 300,
    },
  ]),
  findOne: jest.fn().mockResolvedValue({
    id: "1",
    name: "Bank 1",
    balance: 100,
  }),
  create: jest.fn().mockResolvedValue({
    id: "1",
    name: "Bank 1",
    balance: 100,
  }),
  save: jest.fn().mockResolvedValue({
    id: "1",
    name: "Bank 1",
    balance: 100,
  }),
  update: jest.fn().mockResolvedValue({
    id: "1",
    name: "Bank 1",
  }),
  delete: jest.fn().mockResolvedValue({
    id: "1",
    name: "Bank 1",
    balance: 100,
  }),
})

describe("BankService", () => {
  let service: BankService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        {
          provide: getRepositoryToken(Bank),
          useValue: mockBankRepository(),
        },
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
        },
      ],
    }).compile()

    service = module.get<BankService>(BankService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  describe("findAll", () => {
    it("should return an array of banks", async () => {
      const result = await service.findAll()

      expect(result).toEqual([
        {
          id: "1",
          name: "Bank 1",
          balance: 100,
        },
        {
          id: "2",
          name: "Bank 2",
          balance: 200,
        },
        {
          id: "3",
          name: "Bank 3",
          balance: 300,
        },
      ])
    })
  })

  describe("findOne", () => {
    it("should return a bank", async () => {
      const result = await service.findOne("1")

      expect(result).toEqual({
        id: "1",
        name: "Bank 1",
        balance: 100,
      })
    })
  })

  describe("create", () => {
    it("should create a bank", async () => {
      const result = await service.create({
        name: "Bank 1",
      })

      expect(result).toEqual({
        id: "1",
        name: "Bank 1",
        balance: 100,
      })
    })
  })

  describe("update", () => {
    it("should update a bank", async () => {
      const result = await service.update("1", {
        name: "Bank 1",
      })

      expect(result).toEqual({
        id: "1",
        name: "Bank 1",
      })
    })
  })

  describe("delete", () => {
    it("should delete a bank", async () => {
      const result = await service.delete("1")

      expect(result).toEqual({
        id: "1",
        name: "Bank 1",
        balance: 100,
      })
    })
  })
})
