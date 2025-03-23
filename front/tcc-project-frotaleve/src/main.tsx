import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './styles/index.css'
import App from './App.tsx'
import { HomePage } from './pages/HomePage.tsx';
import { UsersPage } from './pages/UsersPage.tsx';
import { WorkerFormPage } from './pages/WorkerFormPage.tsx';
import Layout from './components/Layout.tsx';
import { VehiclesPage } from './pages/VehiclesPage.tsx';
import { VehicleFormPage } from './pages/VehiclesFormPage.tsx';
import EditWorkerPage from './pages/EditWorkerPage.tsx';

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
            path='/colaboradores/adicionar'
            element={<WorkerFormPage />}
          />

          <Route
            path="/colaboradores/:id"
            element={<EditWorkerPage />}
          />

          <Route
            path='/veiculos'
            element={<VehiclesPage />}
          />

          <Route
            path='/veiculos/adicionar'
            element={<VehicleFormPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)