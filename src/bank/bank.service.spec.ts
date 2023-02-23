import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { BankService } from "./bank.service"
import { Bank } from "./entities/bank.entity"

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
      ],
    }).compile()

    service = module.get<BankService>(BankService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
