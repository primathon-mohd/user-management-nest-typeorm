import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    const msg = await this.authService.signup(dto);
    // console.log('Inside controller side for signup \n', msg);
    return msg;
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto) {
    const msg = await this.authService.signin(dto);
    // console.log('Inside controller side for signin | login  \n', msg);
    // console.log(msg);
    return msg;
  }
}
