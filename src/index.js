import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ListaUsuarios from './pages/ListaUsuarios.jsx';
import Usuario from './pages/Usuario.jsx';
import EditarUsuario from './pages/EditarUsuario.jsx';
import Cadastrar from './pages/Cadastrar.jsx';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const routing = (
  <Router>
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/listausuarios' element={<ListaUsuarios />} />
        <Route path='/usuario' element={<Usuario />} />
        <Route path='/editar' element={<EditarUsuario />} />
        <Route path='/cadastrar' element={<Cadastrar />} />
      </Routes>
    </div>
  </Router>
)

root.render(
  routing
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
