import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Registration')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: [SignUpDto] })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created for signed up.',
  })
  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    const msg = await this.authService.signup(dto);
    // console.log('Inside controller side for signup \n', msg);
    return msg;
  }

  @ApiBody({ type: [SignInDto] })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully used for signed in.',
  })
  @Post('signin')
  // @HttpCode(201)
  async signin(@Body() dto: SignInDto) {
    const msg = await this.authService.signin(dto);
    // console.log('Inside controller side for signin | login  \n', msg);
    // console.log(msg);
    return msg;
  }
}
