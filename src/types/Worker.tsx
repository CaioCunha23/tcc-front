import { Infracao } from "./Infraction";

export interface Colaborador {
  id: number;
  nome: string;
  status: boolean;
  email: string;
  uidMSK: string;
  localidade: string;
  brand: string;
  jobTitle: string;
  cpf: string;
  usaEstacionamento: boolean;
  cidadeEstacionamento: string;
  cnh: string;
  tipoCNH: string;
  infracaos: Infracao[];
  type: string;
}