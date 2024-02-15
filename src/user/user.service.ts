import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentDto, UserDto } from './dto';
import { Permission } from 'src/entity/permissions.entity';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  async get(dto: UserDto, id: number) {
    console.log(dto);
    const role = await this.userRepository.find({
      select: {
        role: true,
      },
      where: {
        email: dto.email,
      },
    });
    if (role.length == 0) {
      throw new NotFoundException('User Not FOUND');
    }
    const student = await this.studentRepository.findOneBy({
      stud_id: id,
    });
    if (!student) {
      throw new NotFoundException('Student Not FOUND');
    }
    console.log(student);
    return student;
  }

  async getAll(dto: UserDto) {
    console.log(dto);
    const role = await this.userRepository.find({
      select: {
        role: true,
      },
      where: {
        email: dto.email,
      },
    });
    if (role.length == 0) {
      throw new NotFoundException('User Not FOUND');
    }
    const students = await this.studentRepository.find({
      select: {},
      where: {},
    });
    if (students.length === 0) {
      throw new NotFoundException('User Not FOUND');
    }
    console.log(students);
    return students;
  }

  async create(dto: UserDto) {
    console.log(dto);
    let role: RegisteredUser[];
    try {
      role = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: dto.email,
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
    const obj = new StudentDto();
    obj.name = 'XYZ';
    obj.mobile = String('9889121212');
    const student = await this.studentRepository.save(obj);
    console.log(student);
    return student;
  }

  async update(dto: UserDto, personId: number) {
    console.log('Inside update method !!', dto);
    let user: RegisteredUser[];
    try {
      user = await this.userRepository.findBy({
        email: dto.email,
      });
    } catch (err) {
      throw new NotFoundException(' Not FOUND');
    }
    if (user.length === 0) {
      throw new NotFoundException(' Not FOUND');
    }
    console.log(user.at(0).role);
    if (user.at(0).role === TypeRole.USER) {
      throw new ForbiddenException('Not authorized to update , ask  admin !!');
    }
    const personPayload = { name: 'John Abraham' };
    let studentRow: any;
    try {
      studentRow = await this.studentRepository
        .createQueryBuilder()
        .update(Student, personPayload)
        .where('stud_id = :stud_id', { stud_id: personId })
        .returning('*')
        .updateEntity(true)
        .execute();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return studentRow;
  }

  async delete(dto: UserDto, id: number) {
    console.log(dto);
    let role: RegisteredUser[];
    try {
      role = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: dto.email,
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

  async deleteAll(dto: UserDto) {
    console.log(dto);
    let role: any;
    try {
      role = await this.userRepository.find({
        select: {
          role: true,
        },
        where: {
          email: dto.email,
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
    await this.studentRepository.clear();
    return 'deleted all';
  }
}
