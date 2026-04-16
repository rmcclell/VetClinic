import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@vet-clinic/shared-types';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      include: {
        client: true,
        patient: true,
      },
      orderBy: {
        startTime: 'asc',
      },
    }) as unknown as Appointment[];
  }

  async findOne(id: number): Promise<Appointment> {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: {
        client: true,
        patient: true,
      },
    }) as unknown as Appointment;
  }

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: {
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        description: data.description,
        status: data.status || 'Scheduled',
        client: { connect: { id: data.clientId } },
        patient: { connect: { id: data.patientId } },
      },
      include: {
        client: true,
        patient: true,
      },
    }) as unknown as Appointment;
  }

  async update(id: number, data: UpdateAppointmentDto): Promise<Appointment> {
    const updateData: any = { ...data };
    if (data.startTime) updateData.startTime = new Date(data.startTime);
    if (data.endTime) updateData.endTime = new Date(data.endTime);

    // Map patientId if present in data, although UpdateAppointmentDto might use different structure
    // Assuming data keys match schema or DTOs.
    // If data has petId, we should map to patientId?
    // Shared Types UpdateAppointmentDto extends Partial<CreateAppointmentDto>.
    // CreateAppointmentDto has patientId.

    return this.prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        client: true,
        patient: true,
      },
    }) as unknown as Appointment;
  }

  async remove(id: number): Promise<Appointment> {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
