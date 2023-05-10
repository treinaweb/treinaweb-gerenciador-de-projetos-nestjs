import { Address } from 'src/addresses/entities/address.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  dataContratacao: Date;

  @Column({ nullable: true })
  dataDemissao?: Date;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  address: Address;

  @ManyToMany(() => Project, (project) => project.employee)
  projects: Project[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
