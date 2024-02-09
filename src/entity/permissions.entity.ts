import {
  Column,
  Entity,
  JoinColumn,
  //   JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { UserRoleType } from './user.abstract.entity';
// import { RequestMethodType } from './request.type';
import { RegisteredUser } from './registered.user.entity';

@Entity({ name: 'permission' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'endpoint', length: 40 })
  url: string[];

  @Column({ type: 'varchar', name: 'request-method' })
  httpVerb: string;

  @Column({ type: 'varchar' })
  role: string;

  @Column({ type: 'varchar', default: 'NA' })
  emailId: string;

  @ManyToOne(() => RegisteredUser, (user) => user.permissions, {
    cascade: ['insert', 'update'],
  })
  // email is taken from RegisterUser
  @JoinColumn({ name: 'registered-user', referencedColumnName: 'email' })
  user: RegisteredUser;

  //   [
  //     { name: "userId", referencedColumnName: "id" },
  //    { name: 'emailId', referencedColumnName: 'email' }
  // ]
}
