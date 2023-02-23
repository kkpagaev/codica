import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  amount: number

  @Column()
  date: Date
}
