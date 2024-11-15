import { Post } from './Post'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}
