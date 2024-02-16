import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentDto } from './dto';
import { Permission } from 'src/entity/permissions.entity';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { TypeRole } from 'src/entity/user.abstract.entity';
import { Student } from 'src/entity/student.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(RegisteredUser)
    private readonly userRepository: Repository<RegisteredUser>,
    @InjectRepository(Permission)
    private readonly permitRepository: Repository<Permission>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(userEmail: string, id: number) {
    let roles: RegisteredUser[];
    try {
      roles = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: userEmail,
        },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    if (roles.length == 0) {
      throw new NotFoundException('User Not FOUND');
    }
    let student: Student;
    try {
      student = await this.studentRepository.findOneBy({
        stud_id: id,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
    if (!student) {
      throw new NotFoundException('Student Not FOUND');
    }
    console.log(student);
    return student;
  }

  async getAll(userEmail: string) {
    let roles: RegisteredUser[];
    try {
      roles = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: userEmail,
        },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    if (roles.length == 0) {
      throw new NotFoundException('User Not FOUND');
    }
    let students: Student[];
    try {
      students = await this.studentRepository.find({
        select: {},
        where: {},
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
    if (students.length === 0) {
      throw new NotFoundException('User Not FOUND');
    }
    console.log(students);
    return students;
  }

  async create(dto: StudentDto, userEmail: string) {
    console.log(dto);
    let role: RegisteredUser[];
    try {
      role = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: userEmail,
        },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
    console.log('Create !!', role, typeof role);
    if (role.length == 0) {
      throw new NotFoundException('User Not FOUND');
    }
    console.log(role.at(0).role);
    if (role.at(0).role !== TypeRole.SUPER)
      throw new ForbiddenException(
        'Not authorized to create , ask super admin !!',
      );

    try {
      const student = await this.studentRepository.save(dto);
      console.log(student);
      return student;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(dto: StudentDto, id: number, userEmail: string) {
    console.log('Inside update method !!', dto);
    let user: RegisteredUser[];
    try {
      user = await this.userRepository.findBy({
        email: userEmail,
      });
    } catch (err) {
      throw new NotFoundException(' Not FOUND');
    }
    if (user.length === 0) {
      throw new NotFoundException(' Not FOUND');
    }
    console.log(user.at(0).role, user);
    if (user.at(0).role === TypeRole.USER) {
      throw new ForbiddenException('Not authorized to update , ask  admin !!');
    }
    let stud: Student;
    try {
      stud = await this.studentRepository.findOneBy({
        stud_id: id,
      });
    } catch (err) {}

    if (!stud) {
      throw new NotFoundException(
        'Student with Given id is not found for update!!',
      );
    }

    let studentRow: UpdateResult;
    try {
      studentRow = await this.studentRepository
        .createQueryBuilder()
        .update(Student, dto)
        .where('stud_id = :stud_id', { stud_id: id })
        .returning('*')
        .updateEntity(true)
        .execute();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return studentRow;
  }

  async delete(userEmail: string, id: number) {
    let role: RegisteredUser[];
    try {
      role = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: userEmail,
        },
      });
    } catch (err) {
      // throw new NotFoundException('User Not FOUND !!');
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }

    if (role.length === 0) {
      throw new HttpException('User Not FOUND', HttpStatus.NOT_FOUND);
    }

    console.log(role.at(0).role);
    if (role.at(0).role !== TypeRole.SUPER)
      throw new ForbiddenException(
        'Not authorized to delete , ask super admin !!',
      );

    let stud: Student;
    try {
      stud = await this.studentRepository.findOneBy({
        stud_id: id,
      });
    } catch (err) {}

    if (!stud) {
      throw new NotFoundException(
        'Student with Given id is not found for delete!!',
      );
    }

    let del: any;
    try {
      del = await this.studentRepository.delete({
        stud_id: id,
      });
      console.log(del);
    } catch (err) {
      new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return del;
  }

  async deleteAll(userEmail: string) {
    let role: RegisteredUser[];
    try {
      role = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: userEmail,
        },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
    if (role.length === 0) {
      throw new NotFoundException(' Not FOUND');
    }
    console.log(role.at(0).role);
    if (role.at(0).role !== TypeRole.SUPER)
      throw new ForbiddenException(
        'Not authorized to delete , ask super admin !!',
      );

    // clear() method can be used.. it truncate the table data.. remove all rows from table.
    try {
      await this.studentRepository.clear();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return 'deleted all';
  }
}
