import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { ActionDto } from './dto/action.dto';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getAllDevices() {
    return this.devicesService.getAllDevices();
  }

  @Post('action')
  async sendAction(@Req() req: any, @Body() dto: ActionDto) {
    return this.devicesService.sendAction(req.user.userId, dto);
  }

  @Get('history')
  async getHistory(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
    @Query('device_id') device_id?: string,
    @Query('device_name') device_name?: string,
    @Query('action') action?: string,
    @Query('status') status?: string,
    @Query('time') time?: string,
    @Query('search') search?: string,
  ) {
    return this.devicesService.getHistory({
      page,
      limit,
      sort,
      device_id: device_id ? parseInt(device_id) : undefined,
      device_name,
      action,
      status,
      time,
      search,
    });
  }
}
