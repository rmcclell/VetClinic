import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule,
    PatientsModule,
    AppointmentsModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
