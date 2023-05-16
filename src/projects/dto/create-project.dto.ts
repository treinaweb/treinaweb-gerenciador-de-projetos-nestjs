import {
  IsCurrency,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { Client } from 'src/clients/entities/client.entity';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  @Length(3, 30, { message: 'Nome deve ter de 3 até 30 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'Orçamento não pode ser vazio.' })
  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo com valor inválido' },
  )
  orcamento: number;

  @IsNotEmpty({ message: 'Data não pode ser vazio.' })
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'Data Inválida - Deve ser no padrão DD/MM/AAAA',
  })
  dataInicio: string;

  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'Data Inválida - Deve ser no padrão DD/MM/AAAA',
  })
  dataFinal?: string;

  @IsNotEmpty({ message: 'Obrigatório selecionar cliente.' })
  @IsNumberString({}, { message: 'Obrigatório número ID de cliente.' })
  client: Client;

  @IsNotEmpty({ message: 'Obrigatório selecionar funcionários.' })
  @IsNumberString(
    {},
    { each: true, message: 'Obrigatório número ID de funcionário.' },
  )
  employeesId: number[];
}
