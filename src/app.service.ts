import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
  console.log('Inside getHello()', 'change!!');
  console.log('Inside appservice getHello method');

    return 'Hello World!';
  }
}
