import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const { nome, cpf, dataContratacao } = createEmployeeDto;
    const employee = this.employeeRepository.create({
      nome,
      cpf,
      dataContratacao,
    });
    const newEmployee = await this.employeeRepository.save(employee);

    const { logradouro, numero, complemento, bairro, cidade, cep, estado } =
      createEmployeeDto;

    const address = this.addressRepository.create({
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      cep,
      estado,
      employee: newEmployee,
    });

    await this.addressRepository.save(address);
    return newEmployee;
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: number) {
    return await this.employeeRepository.findOne({
      relations: { address: true },
      where: { id: id },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { nome, cpf, dataContratacao } = updateEmployeeDto;
    const employee = this.employeeRepository.create({
      nome,
      cpf,
      dataContratacao,
    });
    await this.employeeRepository.update(id, employee);
    const newEmployee = await this.findOne(id);

    const { logradouro, numero, complemento, bairro, cidade, cep, estado } =
      updateEmployeeDto;

    const newAddress = this.addressRepository.create({
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      cep,
      estado,
      employee: newEmployee,
    });

    await this.addressRepository.update(newEmployee.address.id, newAddress);
    return newEmployee;
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    return await this.employeeRepository.remove(employee);
  }

  async inativarFuncionario(id: number) {
    const employee = await this.employeeRepository.findOneBy({ id: id });
    employee.dataDemissao = new Date(Date.now());
    return await this.employeeRepository.update(employee.id, employee);
  }
}
