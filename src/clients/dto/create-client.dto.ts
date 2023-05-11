import { IsNotEmpty, Length } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  @Length(3, 30, { message: 'Nome deve ter de 3 até 30 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'Endereço não pode ser vazio.' })
  @Length(3, 255, { message: 'Endereço deve ter de 3 até 255 caracteres.' })
  endereco: string;

  @IsNotEmpty({ message: 'Observação não pode ser vazio.' })
  @Length(3, 255, { message: 'Observação deve ter de 3 até 255 caracteres.' })
  observacao?: string;
}
