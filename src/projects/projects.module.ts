import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { EmployeesService } from 'src/employees/employees.service';
import { ClientsService } from 'src/clients/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Project } from './entities/project.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Employee, Project, Address])],
  controllers: [ProjectsController],
  providers: [ProjectsService, EmployeesService, ClientsService, Utils],
})
export class ProjectsModule {}
