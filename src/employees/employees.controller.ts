import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Render,
  UseFilters,
  Request,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateException } from 'src/commom/filters/create-exception.filter';
import { UpdateException } from 'src/commom/filters/update-exception.filter';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseFilters(CreateException)
  @Post()
  @Redirect('/employees')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }

  @Get('create')
  @Render('employees/create')
  getViewCreate(@Request() req) {
    return {
      message: req.flash('message'),
      alert: req.flash('alert'),
      oldData: req.flash('oldData'),
    };
  }

  @Get()
  @Render('employees/index')
  async findAll() {
    return { employees: await this.employeesService.findAll() };
  }

  @Get(':id')
  @Render('employees/show')
  async findOne(@Param('id') id: string) {
    return { employee: await this.employeesService.findOne(+id) };
  }

  @Get(':id/edit')
  @Render('employees/edit')
  async getViewEdit(@Param('id') id: string, @Request() req) {
    return {
      employee: await this.employeesService.findOne(+id),
      message: req.flash('message'),
      alert: req.flash('alert'),
      oldData: req.flash('oldData'),
    };
  }

  @UseFilters(UpdateException)
  @Patch(':id')
  @Redirect('/employees')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @Redirect('/employees')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }

  @Get(':id/inativar')
  @Redirect('/employees')
  async inativarFuncionario(@Param('id') id: string) {
    return await this.employeesService.inativarFuncionario(+id);
  }
}
