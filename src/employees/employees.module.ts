import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Address } from 'src/addresses/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Address])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
