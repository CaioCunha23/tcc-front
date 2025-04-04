import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './styles/index.css'
import App from './App.tsx'
import { HomePage } from './pages/Home/HomePage.tsx';
import { UsersPage } from './features/workers/pages/WorkersPage.tsx';
import { WorkerFormPage } from './features/workers/pages/WorkerFormPage.tsx';
import Layout from './components/Layout.tsx';
import { VehiclesPage } from './features/vehicles/pages/VehiclesPage.tsx';
import { VehicleFormPage } from './features/vehicles/pages/VehicleFormPage.tsx';
import EditWorkerPage from './features/workers/pages/EditWorkerPage.tsx';
import EditVehiclePage from './features/vehicles/pages/EditVehiclePage.tsx';
import { VehiclesHistoryPage } from './features/vehicles/pages/VehiclesHistoryPage.tsx';
import { InfractionsPage } from './features/workers/pages/InfractionsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
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
            path='/colaborador/adicionar'
            element={<WorkerFormPage />}
          />

          <Route
            path="/colaborador/:id"
            element={<EditWorkerPage />}
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
            path='/veiculo/adicionar'
            element={<VehicleFormPage />}
          />

          <Route
            path="/veiculo/:id"
            element={<EditVehiclePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)