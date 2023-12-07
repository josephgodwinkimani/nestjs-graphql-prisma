import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getParallelPromises() {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push('Hello World!');
    }
    return Promise.all(promises);
  }
}
