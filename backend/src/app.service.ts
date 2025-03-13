import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): object {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      message: 'API funcionando corretamente!',
    };
  }
}
