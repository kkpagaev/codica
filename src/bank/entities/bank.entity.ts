import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bank {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  balance: number
}
