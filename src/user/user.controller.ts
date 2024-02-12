import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  // @UseGuards(AuthGuard('jwt'))
  //   @UseGuards(JwtGuard)
  getUserInfo(@Body() dto: UserDto, @Req() req: Request) {
    console.log(req.user, typeof req.user);
    // const userInfo = req.user;
    //userInfo.email   === { sub: 6, email: 'efg@gmail.com', iat: 1707394707, exp: 1707395607 }
    // trying to access email from req.user ... Not accessible , since it's not a top-level key..
    // use .attributes. to fetch other keys information..

    // console.log(req.user.constructor, req.user.constructor.prototype);
    // let val = '';
    // for (val of Object.keys(req.user)) {
    //   console.log(val);
    //   if (val === 'email') break;
    // }

    // if (dto.email === req.user) {
    //   throw new ForbiddenException(
    //     ' Authentication tried with different email !! ',
    //   );
    // }

    console.log('Inside getUserInfo !', dto.email, dto.roles);
    const msg = this.userService.get(dto);
    return msg;
  }

  @Get('all')
  getAll(@Body() dto: UserDto) {
    return this.userService.getAll(dto);
  }

  @Post('create')
  createUser(@Body() dto: UserDto) {
    console.log('Inside post request createUser method ! ', dto);
    return this.userService.create(dto);
  }

  @Put('update')
  updateUser(@Body() dto: UserDto) {
    return this.userService.update(dto);
  }

  @Delete('delete')
  deleteUser(@Body() dto: UserDto) {
    return this.userService.delete(dto);
  }

  @Delete('deleteAll')
  deleteAll(@Body() dto: UserDto) {
    return this.userService.deleteAll(dto);
  }
}
