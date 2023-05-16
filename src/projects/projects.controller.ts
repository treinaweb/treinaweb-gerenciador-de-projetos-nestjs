import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
  UseFilters,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientsService } from 'src/clients/clients.service';
import { EmployeesService } from 'src/employees/employees.service';
import { CreateException } from 'src/commom/filters/create-exception.filter';
import { UpdateException } from 'src/commom/filters/update-exception.filter';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private clientsService: ClientsService,
    private employeesService: EmployeesService,
  ) {}

  @UseFilters(CreateException)
  @Post()
  @Redirect('/projects')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Get('create')
  @Render('projects/create')
  async getViewcreate(@Request() req) {
    return {
      clients: await this.clientsService.findAll(),
      employees: await this.employeesService.findAll(),
      message: req.flash('message'),
      alert: req.flash('alert'),
      oldData: req.flash('oldData'),
    };
  }

  @Get()
  @Render('projects/index')
  async findAll() {
    return { projects: await this.projectsService.findAll() };
  }

  @Get(':id')
  @Render('projects/show')
  async findOne(@Param('id') id: string) {
    return { project: await this.projectsService.findOne(+id) };
  }

  @Get(':id/edit')
  @Render('projects/edit')
  async getViewEdit(@Request() req, @Param('id') id: string) {
    return {
      clients: await this.clientsService.findAll(),
      employees: await this.employeesService.findAll(),
      project: await this.projectsService.findOne(+id),
      message: req.flash('message'),
      alert: req.flash('alert'),
      oldData: req.flash('oldData'),
    };
  }

  @UseFilters(UpdateException)
  @Patch(':id')
  @Redirect('/projects')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @Redirect('/projects')
  async remove(@Param('id') id: string) {
    return await this.projectsService.remove(+id);
  }
}
