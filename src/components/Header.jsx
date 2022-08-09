import * as React from 'react';
import '../assets/styles/Header.css';
import '../assets/styles/Global.css'
import logo from '../assets/img/logo.svg'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../services/auth';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Fade from '@mui/material/Fade';
import { url } from '../services/api';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem('login-usuario-users')
    navigate('/')
  }

  return (
    <div>
      <header>
        <div className='container'>
          <img src={logo} alt="" />
          {
            parseJwt() !== null ?
              <div>
                <img className="imgPerfil" onClick={(a) => handleClick(a)} src={url + parseJwt().caminhoImagem} alt="" />
                <Menu
                  keepMounted
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  open={Boolean(anchorEl)}
                >
                  <MenuItem onClick={() => navigate('/usuario', { state: { idUsuario: parseJwt().jti } })}>Minha conta</MenuItem>
                  <MenuItem onClick={() => Logout()}>Logout</MenuItem>
                </Menu>
              </div>
              :
              <button onClick={() => navigate('/login')}>entrar</button>
          }
        </div>
      </header>
    </div>
  );
}