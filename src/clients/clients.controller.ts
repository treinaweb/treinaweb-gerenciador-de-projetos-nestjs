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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateException } from 'src/commom/filters/create-exception.filter';
import { UpdateException } from 'src/commom/filters/update-exception.filter';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseFilters(CreateException)
  @Post()
  @Redirect('/clients')
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.create(createClientDto);
  }

  @Get('create')
  @Render('clients/create')
  getViewCreate(@Request() req) {
    return {
      message: req.flash('message'),
      alert: req.flash('alert'),
      oldData: req.flash('oldData'),
    };
  }

  @Get()
  @Render('clients/index')
  async getViewIndex() {
    return { clients: await this.clientsService.findAll() };
  }

  @Get(':id')
  @Render('clients/show')
  async findOne(@Param('id') id: string) {
    return { client: await this.clientsService.findOne(+id) };
  }

  @Get(':id/edit')
  @Render('clients/edit')
  async getViewEdit(@Param('id') id: string, @Request() req) {
    return {
      client: await this.clientsService.findOne(+id),
      message: req.flash('message'),
      alert: req.flash('alert'),
      oldData: req.flash('oldData'),
    };
  }

  @UseFilters(UpdateException)
  @Patch(':id')
  @Redirect('/clients')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @Redirect('/clients')
  async remove(@Param('id') id: string) {
    return await this.clientsService.remove(+id);
  }
}
