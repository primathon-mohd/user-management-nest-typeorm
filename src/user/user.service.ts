import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { Permission } from 'src/entity/permissions.entity';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(RegisteredUser)
    private readonly userRepository: Repository<RegisteredUser>,
    @InjectRepository(Permission)
    private readonly permitRepository: Repository<Permission>,
  ) {}

  get(dto: UserDto) {
    console.log(dto);
    return 'user info';
  }

  getAll(dto: UserDto) {
    console.log(dto);
    return 'user info';
  }

  create(dto: UserDto) {
    console.log(dto);
    return 'user info';
  }

  update(dto: UserDto) {
    console.log(dto);
    return 'user info';
  }

  delete(dto: UserDto) {
    console.log(dto);
    return 'user info';
  }

  deleteAll(dto: UserDto) {
    console.log(dto);
    return 'deleted';
  }
}
