import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './styles/index.css'
import App from './App.tsx'
import { HomePage } from './pages/Home/HomePage.tsx';
import { UsersPage } from './pages/WorkerPages/WorkersPage.tsx';
import { WorkerFormPage } from './pages/WorkerPages/WorkerFormPage.tsx';
import Layout from './components/Layout.tsx';
import { VehiclesPage } from './pages/VehiclePages/VehiclesPage.tsx';
import { VehicleFormPage } from './pages/VehiclePages/VehicleFormPage.tsx';
import EditWorkerPage from './pages/WorkerPages/EditWorkerPage.tsx';
import EditVehiclePage from './pages/VehiclePages/EditVehiclePage.tsx';
import { VehiclesHistoryPage } from './pages/VehiclePages/VehiclesHistoryPage.tsx';
import { InfractionsPage } from './pages/WorkerPages/InfractionsPage.tsx';

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