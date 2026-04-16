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
import { ClientsService } from './clients.service';
import {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@vet-clinic/shared-types';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Return all clients.' })
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
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
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
  })
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Put(':id')
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
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientsService.remove(id);
  }
}
