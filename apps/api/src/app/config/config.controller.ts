import { Controller, Get, Put, Body } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UpdateClinicConfigDto, ClinicConfig } from '@vet-clinic/shared-types';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get()
  async getConfig(): Promise<ClinicConfig> {
    return this.configService.getConfig();
  }

  @Put()
  async updateConfig(
    @Body() dto: UpdateClinicConfigDto,
  ): Promise<ClinicConfig> {
    return this.configService.updateConfig(dto);
  }
}
