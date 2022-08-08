import '../assets/styles/Header.css';
import '../assets/styles/Global.css'
import logo from '../assets/img/logo.svg'

export default function Header() {
  return (
    <div>
      <header>
        <div className='container'>
          <img src={logo} alt="" />
          <button>entrar</button>
        </div>
      </header>
    </div>
  );
}