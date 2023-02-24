import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Transaction } from "../../transaction/entities/transaction.entity"

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @ManyToMany(() => Transaction, (transaction) => transaction.categories)
  transactions: Transaction[]
}
