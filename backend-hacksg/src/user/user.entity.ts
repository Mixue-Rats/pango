/* user.entity.ts */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string

  @Column({default: Date.now() })
  createdDate: Date

  @Column({ default: false })
  verified: Boolean
  
  @Column({ nullable: true })
  prefs: Object

}