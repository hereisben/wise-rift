import { Controller, Get } from '@nestjs/common';

@Controller('api/health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      success: true,
      message: `App API is healthy`,
    };
  }
}
