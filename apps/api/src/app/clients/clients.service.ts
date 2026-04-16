import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@vet-clinic/shared-types';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  private mapToClient(prismaClient: any): Client {
    return {
      ...prismaClient,
      patients: prismaClient.pets || [],
    } as unknown as Client;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      orderBy: { lastName: 'asc' },
    });
    return clients.map((client) => this.mapToClient(client));
  }

  async findOne(id: number): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: { pets: true },
    });
    if (!client) return null;
    return this.mapToClient(client);
  }

  async create(data: CreateClientDto): Promise<Client> {
    const client = await this.prisma.client.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        secondaryPhone: data.secondaryPhone,
        address: data.address,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        notes: data.notes,
        dob: data.dob,
        gender: data.gender,
        driverLicenseState: data.driverLicenseState,
        driverLicenseNumber: data.driverLicenseNumber,
        driverLicenseExp: data.driverLicenseExp,
        clientType: data.clientType,
        active: data.active ?? true,
      },
    });
    return this.mapToClient(client);
  }

  async update(id: number, data: UpdateClientDto): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return this.mapToClient(client);
  }

  async remove(id: number): Promise<Client> {
    const client = await this.prisma.client.delete({
      where: { id },
    });
    return this.mapToClient(client);
  }
}
