import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `[Microservice] ${process.env.SERVICE_NAME} is running ▶`;
  }
}
