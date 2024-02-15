import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StudentDto } from './dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info/:id')
  // @UseGuards(AuthGuard('jwt'))
  //   @UseGuards(JwtGuard)
  getInfo(@Req() req: Request, @Param('id') id: number) {
    // console.log("------------------------->",req.user," :::::::::: ",req.user["email"],":::::::::::::::");
    // const userInfo = req.user;
    //userInfo.email   === { sub: 6, email: 'efg@gmail.com', iat: 1707394707, exp: 1707395607 }
    // trying to access email from req.user ... Not accessible , since it's not a top-level key..
    // use .attributes. to fetch other keys information..
    const userEmail = req.user['email'];
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

    console.log('Inside getUserInfo !', userEmail, ' and id ', id);
    const msg = this.userService.get(userEmail, id);
    return msg;
  }

  @Get('all')
  getAll(@Req() req: Request) {
    const userEmail = req.user['email'];
    console.log('Inside getAll UserInfo !', userEmail);
    return this.userService.getAll(userEmail);
  }

  @Post('create')
  create(@Req() req: Request, @Body() dto: StudentDto) {
    const userEmail = req.user['email'];
    console.log('create body', dto);
    console.log('Inside create student info !', userEmail);
    return this.userService.create(dto, userEmail);
  }

  @Put('update/:id')
  update(
    @Body() dto: StudentDto,
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    const userEmail = req.user['email'];
    console.log('Inside update student Info !', userEmail, ' and id ', id);
    return this.userService.update(dto, id, userEmail);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number, @Req() req: Request) {
    const userEmail = req.user['email'];
    console.log('Inside delete student info !', userEmail, ' and id ', id);
    return this.userService.delete(userEmail, id);
  }

  @Delete('deleteAll')
  deleteAll(@Req() req: Request) {
    const userEmail = req.user['email'];
    console.log('Inside deleteAll student Info !', userEmail);
    return this.userService.deleteAll(userEmail);
  }
}
