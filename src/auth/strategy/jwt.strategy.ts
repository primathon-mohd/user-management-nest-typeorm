import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    private entityManager: EntityManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  //validate function is required ..
  //payload is attached to the request object and
  //can be accessed using req.user...  See controller in user module
  //   validate(payload: any) {
  //     console.log({
  //       payload,
  //     });
  //     return payload;
  //   }
  async validate(payload: { sub: number; email: string }) {
    console.log('inside validate function in JwtStrategy!', payload);
    // email in payload belongs to the jwt token , while we can fetch user details in which another email can exists..
    const user = await this.entityManager.findOneBy(RegisteredUser, {
      email: payload.email,
    });
    console.log(payload, payload.email);
    if (!user) {
      throw new ForbiddenException(' Not a valid user');
    }
    delete user.password;
    return {
      email: user.email,
      payload,
    };
  }
}
