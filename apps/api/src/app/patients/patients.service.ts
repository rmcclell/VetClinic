import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Patient,
  CreatePatientDto,
  UpdatePatientDto,
} from '@vet-clinic/shared-types';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany({
      include: { client: true },
      orderBy: { name: 'asc' },
    }) as unknown as Patient[];
  }

  async findOne(id: number): Promise<Patient | null> {
    return this.prisma.patient.findUnique({
      where: { id },
      include: { client: true },
    }) as unknown as Patient;
  }

  async create(data: CreatePatientDto): Promise<Patient> {
    return this.prisma.patient.create({
      data: {
        name: data.name,
        species: data.species,
        breed: data.breed,
        sex: data.sex,
        weight: data.weight,
        microchipNumber: data.microchipNumber,
        color: data.color,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        notes: data.notes,
        clientId: data.clientId,
        photoUrl: data.photoUrl,
        rabiesTag: data.rabiesTag,
        preferredProvider: data.preferredProvider,
        referralSource: data.referralSource,
      },
      include: { client: true },
    }) as unknown as Patient;
  }

  async update(id: number, data: UpdatePatientDto): Promise<Patient> {
    return this.prisma.patient.update({
      where: { id },
      data: {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      },
      include: { client: true },
    }) as unknown as Patient;
  }

  async remove(id: number): Promise<Patient> {
    return this.prisma.patient.delete({
      where: { id },
    }) as unknown as Patient;
  }
}
