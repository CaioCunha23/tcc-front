import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Colaborador {
    id: number;
    nome: string;
    status: boolean;
    email: string;
    uidMSK: string;
    password: string;
    type: string;
    localidade: string;
    brand: string;
    jobTitle: string;
    cpf: string;
    usaEstacionamento: boolean;
    cnh: string;
    tipoCNH: string;
    createdAt: string;
    updatedAt: string;
}

interface TokenStore {
    token: string | undefined;
    setToken: (token: string) => void;
    colaborador: Colaborador | undefined;
    setColaborador: (colaborador: Colaborador) => void;
    logout: () => void;
}

export const useTokenStore = create<TokenStore>()(
    persist(
        (set) => ({
            token: undefined,
            colaborador: undefined,
            setToken: (token) => set({ token }),
            setColaborador: (colaborador) => set({ colaborador }),
            logout: () => set({ token: undefined, colaborador: undefined }),
        }),
        {
            name: "token-store",
        }
    )
);