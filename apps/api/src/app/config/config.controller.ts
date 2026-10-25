import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { ConfigService } from './config.service';
import { UpdateClinicConfigDto, ClinicConfig } from '@vet-clinic/shared-types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('config')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get()
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Get clinic configuration' })
  @ApiResponse({ status: 200, description: 'Return clinic config.' })
  async getConfig(): Promise<ClinicConfig> {
    return this.configService.getConfig();
  }

  @Put()
  @Roles(Role.OFFICE_ADMIN)
  @ApiOperation({ summary: 'Update clinic configuration (Office Admin only)' })
  @ApiResponse({ status: 200, description: 'Clinic config updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires OFFICE_ADMIN role.' })
  async updateConfig(
    @Body() dto: UpdateClinicConfigDto,
  ): Promise<ClinicConfig> {
    return this.configService.updateConfig(dto);
  }
}

