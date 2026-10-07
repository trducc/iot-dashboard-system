import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api/docs', 301)
  @ApiExcludeEndpoint()
  getHello() {
    return { message: 'Redirecting to Swagger UI...' };
  }
}
