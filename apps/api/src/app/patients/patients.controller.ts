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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import {
  Patient,
  CreatePatientDto,
  UpdatePatientDto,
} from '@vet-clinic/shared-types';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'Return all patients.' })
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
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
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: 201,
    description: 'The patient has been successfully created.',
  })
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(createPatientDto);
  }

  @Put(':id')
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
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiResponse({
    status: 200,
    description: 'The patient has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.patientsService.remove(id);
  }
}
