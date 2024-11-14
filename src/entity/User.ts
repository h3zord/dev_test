import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Post } from './Post'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}
