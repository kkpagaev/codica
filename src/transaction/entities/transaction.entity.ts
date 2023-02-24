import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { Bank } from "../../bank/entities/bank.entity"
import { Category } from "../../category/entities/category.entity"

export enum TransactionType {
  PROFITABLE = "profitable",
  CONSUMABLE = "consumable",
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string

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

  @ManyToMany(() => Category, (category) => category.transactions)
  @JoinTable()
  categories: Category[]
}
