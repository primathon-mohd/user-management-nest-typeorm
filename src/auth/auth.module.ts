import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { Permission } from 'src/entity/permissions.entity';

// @Global()
@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    TypeOrmModule.forFeature([RegisteredUser, Permission]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService],
})
export class AuthModule {}
