import { Colaborador } from '@/types/Worker';
import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenStore {
    token: string | undefined;
    setToken: (token: string) => void;
    colaborador: Colaborador | undefined;
    setColaborador: (colaborador: Colaborador) => void;
    logout: (queryClient?: QueryClient) => void;
}

export const useTokenStore = create<TokenStore>()(
    persist(
        (set) => ({
            token: undefined,
            colaborador: undefined,
            setToken: (token) => set({ token }),
            setColaborador: (colaborador) => set({ colaborador }),
            logout: (queryClient?: QueryClient) => {
                if (queryClient) {
                    queryClient.clear();
                }
                set({ token: undefined, colaborador: undefined });
            },
        }),
        {
            name: "token-store",
        }
    )
);