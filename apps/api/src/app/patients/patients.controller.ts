import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PatientsService } from './patients.service';
import {
  Patient,
  CreatePatientDto,
  UpdatePatientDto,
} from '@vet-clinic/shared-types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('patients')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'Return all patients.' })
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH, Role.CLIENT)
  @ApiOperation({ summary: 'Get patient by id' })
  @ApiResponse({ status: 200, description: 'Return the patient.' })
  @ApiResponse({ status: 404, description: 'Patient not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  @Post()
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: 201,
    description: 'The patient has been successfully created.',
  })
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(createPatientDto);
  }

  @Put(':id')
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Update a patient' })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully updated.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @Roles(Role.OFFICE_ADMIN)
  @ApiOperation({ summary: 'Delete a patient (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires OFFICE_ADMIN role.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.patientsService.remove(id);
  }
}
