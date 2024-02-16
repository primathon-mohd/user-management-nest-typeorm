import { Permission } from './../entity/permissions.entity';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { EntityManager, Repository } from 'typeorm';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PermissionDto,
  SignInDto,
  SignUpDto,
  deleteUrl,
  getUrl,
  postUrl,
  putUrl,
} from './dto';
import { TypeRole } from 'src/entity/user.abstract.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private entityManager: EntityManager,
    @InjectRepository(RegisteredUser)
    private readonly userRepository: Repository<RegisteredUser>,
    @InjectRepository(Permission)
    private readonly permitRepository: Repository<Permission>,
  ) {}

  async signup(dto: SignUpDto) {
    // check if already exists.. and throw ForbiddenException // or return some message to login, Already signed up
    // If email is primary key, any attempt to insert repetitive value will throw exception.
    console.log('Inside sign up service impl ', dto.email);
    // Encode password into different form ..
    const hash = await argon.hash(dto.password);
    // console.log(hash);
    // Now, insert into table..
    dto.password = hash;
    let user: any;
    try {
      user = await this.userRepository.save(dto);
      console.log(user);
    } catch (err) {
      throw new BadRequestException(
        'Account with this email already exists.',
        err.error,
      );
    }
    //Now, calling permission insertion to insertion rows in Permission table.
    let permission: any;
    try {
      permission = await this.permissionInsertion(user);
    } catch (err) {
      console.log(
        'Exception caught while insertion into permission table !',
        err.error,
      );
    }

    delete user.password;
    // For token generation , using JWT .. and then returning to the user.
    let token: any;
    try {
      token = await this.signToken(user.id, user.email);
    } catch (err) {
      console.log('Error while generating token !!', err.error);
    }
    return {
      token,
      user,
      permission,
    };
  }

  async permissionInsertion(user: RegisteredUser) {
    console.log(user, user.role, TypeRole.USER);
    console.log(typeof TypeRole.USER);
    const permit: object[] = [];
    if (user.role === TypeRole.USER) {
      // let obj: PermissionDto;
      const obj = new PermissionDto();
      obj.httpVerb = 'get';
      obj.role = 'user';
      obj.url = getUrl;
      obj.emailId = user.email;
      obj.user = user;

      permit.push({
        requestMethod: obj.httpVerb,
        requestUrl: obj.url,
      });

      try {
        await this.permitRepository.save(obj);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    } else if (user.role === TypeRole.ADMIN) {
      // logic for insertion
      const getObj = new PermissionDto();
      getObj.role = 'admin';
      getObj.httpVerb = 'get';
      getObj.url = getUrl;
      getObj.emailId = user.email;
      getObj.user = user;

      permit.push({
        requestMethod: getObj.httpVerb,
        requestUrl: getObj.url,
      });
      try {
        await this.permitRepository.save(getObj);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
      const updateObj = new PermissionDto();
      updateObj.role = 'admin';
      updateObj.httpVerb = 'put';
      updateObj.url = putUrl;
      updateObj.emailId = user.email;
      updateObj.user = user;

      permit.push({
        requestMethod: updateObj.httpVerb,
        requestUrl: updateObj.url,
      });

      try {
        await this.permitRepository.save(updateObj);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    } else if (user.role === TypeRole.SUPER) {
      // logic for insertion
      const getObj = new PermissionDto();
      getObj.role = 'super-admin';
      getObj.httpVerb = 'get';
      getObj.url = getUrl;
      getObj.emailId = user.email;
      getObj.user = user;

      permit.push({
        requestMethod: getObj.httpVerb,
        requestUrl: getObj.url,
      });

      try {
        await this.permitRepository.save(getObj);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
      const updateObj = new PermissionDto();
      updateObj.role = 'super-admin';
      updateObj.httpVerb = 'put';
      updateObj.url = putUrl;
      updateObj.emailId = user.email;
      updateObj.user = user;

      permit.push({
        requestMethod: updateObj.httpVerb,
        requestUrl: updateObj.url,
      });

      try {
        await this.permitRepository.save(updateObj);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
      const createObj = new PermissionDto();
      createObj.role = 'super-admin';
      createObj.httpVerb = 'post';
      createObj.url = postUrl;
      createObj.emailId = user.email;
      createObj.user = user;

      permit.push({
        requestMethod: createObj.httpVerb,
        requestUrl: createObj.url,
      });

      try {
        await this.permitRepository.save(createObj);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
      const deleteObj = new PermissionDto();
      deleteObj.role = 'super-admin';
      deleteObj.httpVerb = 'delete';
      deleteObj.url = deleteUrl;
      deleteObj.emailId = user.email;
      deleteObj.user = user;
      permit.push({
        requestMethod: deleteObj.httpVerb,
        requestUrl: deleteObj.url,
      });

      try {
        await this.permitRepository.save(deleteObj);
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new ForbiddenException(' Unknown user role observed !!');
    }

    return permit;
  }

  async signin(dto: SignInDto) {
    // Check if email is already existing , and then return the user details ( rows from DB)
    console.log('Inside sign in | login service impl ', dto);
    const user = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (!user) {
      throw new NotFoundException('Invalid email | Not registered yet');
    }
    console.log(user.email, user.password);
    // Check if hash password ,received matches the hash password of the user.
    const hash = user.password;
    // '$argon2id$v=19$m=65536,t=3,p=4$qE4kqYzFvkkSm4i5DqhHjA$x8KvfCbBfPM4iYJPZi5pCnaCq+EAGU9UxonEnNACGgs';
    const psMatches = await argon.verify(hash, dto.password);
    if (!psMatches) {
      throw new ForbiddenException('Invalid Password !!');
    }
    let permission: any;
    try {
      permission = await this.permissionSearch(user);
    } catch (err) {
      console.log(err.error);
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
    delete user.password;
    // Instead of constant value =1 , I will use id number from database.
    const token = await this.signToken(user.id, user.email);
    return {
      token,
      user,
      permission,
    };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    let token: any;
    try {
      token = await this.jwtService.signAsync(payload, {
        expiresIn: '2h',
        secret: this.config.get('JWT_SECRET'),
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }
    return { access_token: token };
  }

  async permissionSearch(userInfo: RegisteredUser) {
    console.log(userInfo);
    let rows: any;
    try {
      rows = await this.permitRepository.find({
        select: {
          url: true,
          httpVerb: true,
        },
        where: {
          emailId: userInfo.email,
          // 'registered-user': userInfo.email,
        },
      });
      console.log(rows);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return rows;
  }

  async signToken30(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    });
    return { access_token: token };
  }
}
