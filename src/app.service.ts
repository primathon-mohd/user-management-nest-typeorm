import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
  console.log('Inside getHello()', 'change!!');
    return 'Hello World!';
  }
}
