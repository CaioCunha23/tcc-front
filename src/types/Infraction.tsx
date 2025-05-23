export interface Infracao {
    id: number,
    tipo: string;
    placaVeiculo: string;
    colaboradorUid: string;
    veiculoId: number;
    costCenter: string;
    dataInfracao: Date;
    tag: string;
    hora: string;
    valor: number;
    prefixo: string;
    marca: string;
    categoria: string;
    rodovia: string;
    praca: string;
    nome: string;
    dataEnvio: Date;
    valorMulta: number;
    codigoMulta: string;
    indicacaoLimite: Date;
    statusResposta: string;
    reconhecimento: boolean;
    enviadoParaRH: boolean;
}