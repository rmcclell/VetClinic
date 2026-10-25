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
import { ClientsService } from './clients.service';
import {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@vet-clinic/shared-types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('clients')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH)
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Return all clients.' })
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @Roles(Role.OFFICE_ADMIN, Role.DOCTOR, Role.TECH, Role.CLIENT)
  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({ status: 200, description: 'Return the client.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    const client = await this.clientsService.findOne(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  @Post()
  @Roles(Role.OFFICE_ADMIN, Role.TECH)
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
  })
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Put(':id')
  @Roles(Role.OFFICE_ADMIN, Role.TECH)
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully updated.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Roles(Role.OFFICE_ADMIN)
  @ApiOperation({ summary: 'Delete a client (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Requires OFFICE_ADMIN role.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientsService.remove(id);
  }
}
