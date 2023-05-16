import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { EmployeesService } from 'src/employees/employees.service';
import { Utils } from 'src/utils/utils';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private repository: Repository<Project>,
    private employeesService: EmployeesService,
    private utils: Utils,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    const { nome, orcamento, dataInicio, dataFinal, client, employeesId } =
      createProjectDto;
    const newDateFinal = this.utils.converterParaDataISO(dataFinal);
    const newDateInicio = this.utils.converterParaDataISO(dataInicio);

    const newEmployees = await this.employeesService.find(employeesId);

    const project = this.repository.create({
      nome,
      orcamento: this.utils.formatDecimal(orcamento),
      dataInicio: new Date(newDateInicio),
      dataFinal: new Date(newDateFinal),
      client,
      employee: newEmployees,
    });
    return await this.repository.save(project);
  }

  async findAll() {
    return await this.repository.find({ relations: { client: true } });
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      relations: { employee: true, client: true },
      where: { id: id },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { nome, orcamento, dataInicio, dataFinal, client, employeesId } =
      updateProjectDto;

    const newEmployees = await this.employeesService.find(employeesId);

    let project = await this.repository.findOne({
      relations: { employee: true },
      where: { id: id },
    });

    const newDateFinal = this.utils.converterParaDataISO(dataFinal);
    const newDateInicio = this.utils.converterParaDataISO(dataInicio);

    project = {
      id: id,
      nome,
      orcamento: this.utils.formatDecimal(orcamento),
      dataInicio: new Date(newDateInicio),
      dataFinal: new Date(newDateFinal),
      client,
      employee: newEmployees,
      createdAt: project.createdAt,
      uptdatedAt: new Date(Date.now()),
    };

    return await this.repository.save(project);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
