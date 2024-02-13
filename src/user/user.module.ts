import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisteredUser } from 'src/entity/registered.user.entity';
import { Permission } from 'src/entity/permissions.entity';
import { Student } from 'src/entity/student.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    AuthModule,
    ConfigModule,
    TypeOrmModule.forFeature([RegisteredUser, Permission, Student]),
  ],
  exports: [],
})
export class UserModule {}
