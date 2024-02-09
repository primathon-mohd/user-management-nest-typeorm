import { PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRoleType = 'admin' | 'super-admin' | 'user';

export enum TypeRole {
  ADMIN = 'admin',
  SUPER = 'super-admin',
  USER = 'user',
}

// @Entity() Not required for abstract class
export abstract class BasicInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 40 })
  username: string;

  @Column({
    type: 'enum',
    // enum: ['admin', 'super-admin', 'user'],
    enum: TypeRole,
    default: TypeRole.USER,
  })
  role: TypeRole;

  @Column('varchar', { length: 50, unique: true })
  email: string;
}
