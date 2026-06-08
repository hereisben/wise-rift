import { Controller, Get } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return successResponse(`WiseRift API is healthy`);
  }
}
