import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './styles/index.css'
import App from './App.tsx'
import { HomePage } from '@/pages/home/HomePage.tsx';
import { UsersPage } from './features/workers/pages/WorkersPage.tsx';
import Layout from './components/Layout.tsx';
import { VehiclesPage } from './features/vehicles/pages/VehiclesPage.tsx';
import { VehiclesHistoryPage } from './features/vehicles/pages/VehiclesHistoryPage.tsx';
import { InfractionsPage } from './features/infractions/pages/InfractionsPage.tsx';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TemporaryVehiclePage } from './features/vehicles/pages/TemporaryVehiclePage.tsx';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FirstAccessPage } from './pages/firstAccess/FirstAccessPage.tsx';
import { ForgotPasswordPage } from './pages/resetPassword/ForgotPasswordPage.tsx';
import { ResetPasswordPage } from './pages/resetPassword/ResetPasswordPage.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path='/'
              element={<App />}
            />

            <Route path='/primeiro-acesso'
              element={<FirstAccessPage />}
            />

            <Route path="/forgot-password"
              element={<ForgotPasswordPage />}
            />

            <Route path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />

            <Route element={<Layout />}>
              <Route
                path='/home'
                element={<HomePage />}
              />

              <Route
                path='/colaboradores'
                element={<UsersPage />}
              />

              <Route
                path="/colaboradores/multas"
                element={<InfractionsPage />}
              />

              <Route
                path='/veiculos'
                element={<VehiclesPage />}
              />

              <Route
                path="/veiculo_colaborador"
                element={<VehiclesHistoryPage />}
              />

              <Route
                path="/solicitar_veiculo"
                element={<TemporaryVehiclePage />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)