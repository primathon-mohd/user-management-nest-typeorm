import { Column, Entity, OneToMany } from 'typeorm';
import { BasicInfo } from './user.abstract.entity';
import { Permission } from './permissions.entity';

@Entity({ name: 'users' })
export class RegisteredUser extends BasicInfo {
  @Column({ name: 'hash' })
  password: string;

  @Column({ type: 'int', default: 21 })
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // @CreateDateColumn()
  // created_at: Date; // Creation date

  // @UpdateDateColumn()
  // updated_at: Date; // Last updated date

  @Column('varchar', { length: 50, nullable: true })
  description?: string;

  @OneToMany(() => Permission, (permission) => permission.user, {
    cascade: ['insert', 'update'],
  })
  // @JoinColumn({ name: 'http-method', referencedColumnName: 'id' })
  permissions: Permission[];
}
