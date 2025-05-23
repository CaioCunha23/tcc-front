export interface Veiculo {
    id: number;
    fornecedor: string;
    contrato: string;
    placa: string;
    renavam: string;
    chassi: string;
    modelo: string;
    cor: string;
    status: string;
    cliente: string;
    perfil: string;
    centroCusto: string;
    franquiaKM: number;
    carroReserva: boolean;
    dataDisponibilizacao: Date;
    mesesContratados: number;
    previsaoDevolucao: Date;
    mesesFaltantes: number;
    mensalidade: number;
    budget: number;
    multa: number;
    proximaRevisao: Date;
}