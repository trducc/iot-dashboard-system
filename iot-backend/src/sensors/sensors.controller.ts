import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SensorsService } from './sensors.service';

@Controller('sensors')
@UseGuards(JwtAuthGuard)
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get('latest')
  async getLatest() {
    return this.sensorsService.getLatest();
  }

  @Get('chart-data')
  async getChartData() {
    return this.sensorsService.getChartData();
  }

  @Get('list')
  async getAllSensors() {
    return this.sensorsService.getAllSensors();
  }

  @Get('history')
  async getHistory(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
    @Query('sortBy') sortBy?: 'created_at' | 'value',
    @Query('sensor_id') sensor_id?: string,
    @Query('sensor_name') sensor_name?: string,
    @Query('time') time?: string,
    @Query('warning_type') warning_type?: string,
    @Query('search') search?: string,
  ) {
    return this.sensorsService.getHistory({
      page,
      limit,
      sort,
      sortBy,
      sensor_id: sensor_id ? parseInt(sensor_id) : undefined,
      sensor_name,
      time,
      warning_type,
      search,
    });
  }
}
