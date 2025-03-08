import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './styles/index.css'
import App from './App.tsx'
import { HomePage } from './pages/HomePage.tsx';
import { UsersPage } from './pages/UsersPage.tsx';
import { WorkerFormPage } from './pages/WorkerFormPage.tsx';
import Layout from './components/ui/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />

        <Route element={<Layout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/usuarios' element={<UsersPage />} />
          <Route path='/usuarios/:usuarioId' element={<UsersPage />} />
          <Route path='/usuarios/adicionar' element={<WorkerFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)