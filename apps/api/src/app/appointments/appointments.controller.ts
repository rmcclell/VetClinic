import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AppointmentsService } from './appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@vet-clinic/shared-types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('appointments')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, description: 'Return all appointments.' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH, Role.CLIENT)
  @ApiOperation({ summary: 'Get appointment by id' })
  @ApiResponse({ status: 200, description: 'Return the appointment.' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Post()
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH, Role.CLIENT)
  @ApiOperation({ summary: 'Create or request an appointment' })
  @ApiResponse({ status: 201, description: 'Appointment created successfully.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Put(':id')
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Update an appointment' })
  @ApiResponse({ status: 200, description: 'Appointment updated successfully.' })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Delete or cancel an appointment' })
  @ApiResponse({ status: 200, description: 'Appointment deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}

