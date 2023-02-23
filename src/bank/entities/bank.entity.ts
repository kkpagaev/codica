import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Transaction } from "../../transaction/entities/transaction.entity"

@Entity()
export class Bank {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ default: 0 })
  balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.bank)
  transactions: Transaction[]
}
