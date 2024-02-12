import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { Permission } from 'src/entity/permissions.entity';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeRole } from 'src/entity/user.abstract.entity';

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

  async create(dto: UserDto) {
    console.log(dto);
    const role = await this.userRepository.find({
      select: {
        role: true,
      },
      where: {
        email: dto.email,
      },
    });
    console.log(role.at(0).role);
    if (role.at(0).role !== TypeRole.SUPER)
      throw new ForbiddenException(
        'Not authorized to create , ask super admin !!',
      );
    return 'user info';
  }

  async update(dto: UserDto) {
    console.log('Inside update method !!', dto);
    const user = await this.userRepository.findBy({
      email: dto.email,
    });
    console.log(user.at(0).role);
    if (user.at(0).role === TypeRole.USER) {
      throw new ForbiddenException('Not authorized to update , ask  admin !!');
    }
    return 'user info';
  }

  async delete(dto: UserDto) {
    console.log(dto);
    const role = await this.userRepository.find({
      select: {
        role: true,
      },
      where: {
        email: dto.email,
      },
    });
    console.log(role.at(0).role);
    if (role.at(0).role !== TypeRole.SUPER)
      throw new ForbiddenException(
        'Not authorized to delete , ask super admin !!',
      );
    return 'user info';
  }

  async deleteAll(dto: UserDto) {
    console.log(dto);
    const role = await this.userRepository.find({
      select: {
        role: true,
      },
      where: {
        email: dto.email,
      },
    });
    console.log(role.at(0).role);
    if (role.at(0).role !== TypeRole.SUPER)
      throw new ForbiddenException(
        'Not authorized to delete , ask super admin !!',
      );
    return 'deleted';
  }
}
