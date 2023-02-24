import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import { AppModule } from "./../src/app.module"
import { CreateCategoryDto } from "../src/category/dto/create-category.dto"
import { UpdateBankDto } from "../src/bank/dto/update-bank.dto"
import { CreateBankDto } from "../src/bank/dto/create-bank.dto"
import { CreateTransactionDto } from "../src/transaction/dto/create-transaction.dto"
import { TransactionType } from "../src/transaction/entities/transaction.entity"

describe("API (e2e)", () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it("/categories/stats (GET)", () => {
    return request(app.getHttpServer()).get("/category/stats").expect(400)
  })

  describe("BankController", () => {
    let bank = null
    it("/bank (POST)", async () => {
      const res = await request(app.getHttpServer())
        .post("/bank")
        .send({ name: "test bank" } as CreateBankDto)
        .expect(201)
      bank = res.body
    })

    it("/bank (GET)", () => {
      return request(app.getHttpServer()).get("/bank").expect(200)
    })

    it("/bank/:id (GET)", () => {
      return request(app.getHttpServer()).get(`/bank/${bank.id}`).expect(200)
    })

    describe("Bank update", () => {
      it("/bank/:id (PUT)", () => {
        return request(app.getHttpServer())
          .put(`/bank/${bank.id}`)
          .send({ name: "updated bank" } as UpdateBankDto)
          .expect(200)
      })

      it("/bank/:id (GET)", async () => {
        const res = await request(app.getHttpServer())
          .get(`/bank/${bank.id}`)
          .expect(200)
        expect(res.body.name).toBe("updated bank")
      })
    })
  })

  describe("CategoryController", () => {
    let category = null
    it("/category (POST)", async () => {
      const res = await request(app.getHttpServer())
        .post("/category")
        .send({
          name: "test category",
          description: "test description",
        } as CreateCategoryDto)
        .expect(201)
      category = res.body
    })

    it("/category (GET)", () => {
      return request(app.getHttpServer()).get("/category").expect(200)
    })

    it("/category/:id (GET)", () => {
      return request(app.getHttpServer())
        .get(`/category/${category.id}`)
        .expect(200)
    })

    describe("Category update", () => {
      it("/category/:id (PUT)", () => {
        return request(app.getHttpServer())
          .put(`/category/${category.id}`)
          .send({ name: "updated category" } as UpdateBankDto)
          .expect(200)
      })

      it("/category/:id (GET)", async () => {
        const res = await request(app.getHttpServer())
          .get(`/category/${category.id}`)
          .expect(200)
        expect(res.body.name).toBe("updated category")
      })
    })
  })

  describe("TransactionController", () => {
    let bank = null
    let category = null
    let transaction = null
    it("/bank (POST)", async () => {
      const res = await request(app.getHttpServer())
        .post("/bank")
        .send({ name: "test bank" } as CreateBankDto)
        .expect(201)
      bank = res.body
    })

    it("/category (POST)", async () => {
      const res = await request(app.getHttpServer())
        .post("/category")
        .send({
          name: "test category",
          description: "test description",
        } as CreateCategoryDto)
        .expect(201)
      category = res.body
    })

    describe("webhook positive amount", () => {
      it("should not give access to webhook", async () => {
        const res = await request(app.getHttpServer())
          .post("/transaction/webhook")
          .send({
            amount: 100,
            bankId: bank.id,
            categories: [category.id],
          } as CreateTransactionDto)
          .expect(401)
        transaction = res.body
      })
      it("/transaction/webhook ", async () => {
        const res = await request(app.getHttpServer())
          .post("/transaction/webhook")
          .set({
            "X-Access-Key": "123",
          })
          .send({
            amount: 100,
            bankId: bank.id,
            type: TransactionType.PROFITABLE,
            categories: [category.id],
          } as CreateTransactionDto)
          .expect(201)
        transaction = res.body
      })
      it("/transaction (GET)", async () => {
        const res = await request(app.getHttpServer())
          .get("/transaction?limit=10&page=1")
          .expect(200)
        transaction = res.body.items[0]
      })

      it("bank balance should be 100", async () => {
        const res = await request(app.getHttpServer())
          .get(`/bank/${bank.id}`)
          .expect(200)
        expect(res.body.balance).toBe(100)
      })

      it("/transaction/:id (DELETE)", () => {
        return request(app.getHttpServer())
          .delete(`/transaction/${transaction.id}`)
          .expect(200)
      })

      it("bank balance should be 0", async () => {
        const res = await request(app.getHttpServer())
          .get(`/bank/${transaction.bankId}`)
          .expect(200)
        expect(res.body.balance).toBe(0)
      })
    })

    describe("webhook negative amount", () => {
      it("/transaction/webhook ", async () => {
        const res = await request(app.getHttpServer())
          .post("/transaction/webhook")
          .set({
            "X-Access-Key": "123",
          })
          .send({
            amount: -100,
            bankId: bank.id,
            type: TransactionType.CONSUMABLE,
            categories: [category.id],
          } as CreateTransactionDto)
          .expect(201)
        transaction = res.body
      })
      it("/transaction (GET)", async () => {
        const res = await request(app.getHttpServer())
          .get("/transaction?limit=10&page=1")
          .expect(200)
        transaction = res.body.items[0]
      })

      it("bank balance should be -100", async () => {
        const res = await request(app.getHttpServer())
          .get(`/bank/${transaction.bankId}`)
          .expect(200)
        expect(res.body.balance).toBe(-100)
      })

      it("/transaction/:id (DELETE)", () => {
        return request(app.getHttpServer())
          .delete(`/transaction/${transaction.id}`)
          .expect(200)
      })

      it("bank balance should be 0", async () => {
        const res = await request(app.getHttpServer())
          .get(`/bank/${transaction.bankId}`)
          .expect(200)
        expect(res.body.balance).toBe(0)
      })
    })
  })
})
