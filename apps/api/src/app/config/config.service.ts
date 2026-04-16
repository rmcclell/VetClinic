import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClinicConfig, UpdateClinicConfigDto } from '@vet-clinic/shared-types';

@Injectable()
export class ConfigService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Ensure we have at least one config record
    const count = await this.prisma.clinicConfig.count();
    if (count === 0) {
      await this.prisma.clinicConfig.create({
        data: {
          id: 1,
          name: 'VetClinic',
          units: 'metric',
          dateFormat: 'MM/dd/yyyy',
          taxRate: 0.0,
        },
      });
    }
  }

  async getConfig(): Promise<ClinicConfig> {
    const config = await this.prisma.clinicConfig.findFirst({
      where: { id: 1 },
    });
    return config as unknown as ClinicConfig;
  }

  async updateConfig(dto: UpdateClinicConfigDto): Promise<ClinicConfig> {
    const config = await this.prisma.clinicConfig.update({
      where: { id: 1 },
      data: dto as any,
    });
    return config as unknown as ClinicConfig;
  }
}
