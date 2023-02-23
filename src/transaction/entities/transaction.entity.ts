import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Bank } from "../../bank/entities/bank.entity"

export enum TransactionType {
  PROFITABLE = "profitable",
  CONSUMABLE = "consumable",
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  amount: number

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type: TransactionType

  @Column()
  bankId: string

  @ManyToOne(() => Bank, (bank) => bank.transactions)
  bank: Bank
}
