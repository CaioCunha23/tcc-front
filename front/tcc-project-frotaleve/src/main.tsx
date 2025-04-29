import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './styles/index.css'
import App from './App.tsx'
import { HomePage } from './pages/Home/HomePage.tsx';
import { UsersPage } from './features/workers/pages/WorkersPage.tsx';
import Layout from './components/Layout.tsx';
import { VehiclesPage } from './features/vehicles/pages/VehiclesPage.tsx';
import { VehiclesHistoryPage } from './features/vehicles/pages/VehiclesHistoryPage.tsx';
import { InfractionsPage } from './features/infractions/pages/InfractionsPage.tsx';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TemporaryVehiclePage } from './features/vehicles/pages/TemporaryVehiclePage.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-center" />
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/'
            element={<App />}
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
  </StrictMode>,
)