import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  stud_id: number;

  @Column('varchar', { name: '', length: 40 })
  name: string;

  //   text field does not support length property
  @Column({ type: 'text', name: 'home address', default: 'NA' })
  permanent_address: string;

  @Column('varchar', { name: 'current address', length: 50, default: 'NA' })
  current_address: string;

  //   bigint field does not support length property
  // bigint field is again not parsable to be stored in DB
  @Column({ type: 'varchar', name: 'contact number', default: 'Not Provided' })
  mobile: string;

  @Column({ type: 'varchar', name: 'email', length: 25, nullable: true })
  emailId: string;

  //datetime type is not supported with postgres , so changing it to timestamp
  @Column({
    type: 'date',
    name: 'date of birth',
    // nullable: true,
    default: 'now()',
  })
  dateOfBirth: Date;

  @Column({
    type: 'date',
    name: 'admission date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateOfAdmission: Date;
}
