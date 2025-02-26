import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './styles/index.css'
import App from './App.tsx'
import { HomePage } from './pages/HomePage.tsx';
import { UsuariosPage } from './pages/UsuariosPage.tsx';
import Layout from './components/Layout.tsx';
import Page from './app/dashboard/page.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/dashboard' element={<Page />} />

        <Route element={<Layout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/usuarios' element={<UsuariosPage />} />
          <Route path='/usuarios/:usuarioId' element={<UsuariosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)