import { ClienteSexo } from 'src/constants/cliente-sexo.enum';

export interface ClienteInterface {
  nome: string;
  sobrenome: string;
  sexo: ClienteSexo;
  idade: number;
}