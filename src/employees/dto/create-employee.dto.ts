import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  @Length(3, 30, { message: 'Nome deve ter de 3 até 30 caracteres.' })
  @IsString({ message: 'Nome deve ser texto.' })
  nome: string;

  @IsNotEmpty({ message: 'CPF não pode ser vazio.' })
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 caracteres.' })
  cpf: string;

  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'Data Inválida - Deve ser no padrão DD/MM/AAAA',
  })
  @IsNotEmpty({ message: 'Data não pode ser vazio.' })
  dataContratacao: string;

  @IsNotEmpty({ message: 'Logradouro não pode ser vazio.' })
  @Length(3, 100, { message: 'Logradouro deve ter de 3 até 00 caracteres.' })
  @IsString({ message: 'Logradouro deve ser texto.' })
  logradouro: string;

  @IsNotEmpty({ message: 'Número não pode ser vazio.' })
  @Length(3, 10, { message: 'Numero deve ter de 3 até 30 caracteres.' })
  numero: string;

  complemento?: string;

  @IsNotEmpty({ message: 'Bairro não pode ser vazio.' })
  @Length(3, 30, { message: 'Bairro deve ter de 3 até 30 caracteres.' })
  @IsString({ message: 'Bairro deve ser texto.' })
  bairro: string;

  @IsNotEmpty({ message: 'Cidade não pode ser vazio.' })
  @Length(3, 20, { message: 'Cidade deve ter de 3 até 20 caracteres.' })
  @IsString({ message: 'Cidade deve ser texto.' })
  cidade: string;

  @IsNotEmpty({ message: 'O CEP não pode ser vazio.' })
  @Length(8, 8, { message: 'O CEP deve ter exatamente 8 caracteres.' })
  cep: string;

  @IsNotEmpty({ message: 'Estado não pode ser vazio.' })
  @Length(3, 20, { message: 'Estado deve ter de 3 até 20 caracteres.' })
  @IsString({ message: 'Estado deve ser texto.' })
  estado: string;
}
