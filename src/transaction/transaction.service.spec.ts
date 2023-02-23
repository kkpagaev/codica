import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { BankService } from "../bank/bank.service"
import { Transaction } from "./entities/transaction.entity"
import { TransactionService } from "./transaction.service"

const mockTransactionRepository = () => ({
  find: jest.fn(),
})

describe("TransactionService", () => {
  let service: TransactionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionRepository(),
        },
        {
          provide: BankService,
          useValue: {
            processTransaction: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<TransactionService>(TransactionService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
