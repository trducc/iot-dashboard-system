import { IsNumber, IsString, IsIn } from 'class-validator';

export class ActionDto {
  @IsNumber()
  device_id: number;

  @IsString()
  @IsIn(['ON', 'OFF'])
  action: string;
}
