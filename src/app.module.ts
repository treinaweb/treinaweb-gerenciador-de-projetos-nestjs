import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/data-source';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { EmployeesModule } from './employees/employees.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ClientsModule,
    ProjectsModule,
    EmployeesModule,
    AddressesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
