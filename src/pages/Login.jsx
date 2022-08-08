import '../assets/styles/Global.css'
import '../assets/styles/Login.css'
import logo from '../assets/img/logo2.svg'

export default function Login() {
    return (
        <div>
            <div className='box-login'>
                <div className='content'>
                    <img src={logo} alt="" />
                    <h1>Bem vindo(a)!</h1>
                    <div>
                        <input placeholder='E-mail' type="text" />
                        <input placeholder='Senha' type="password" />
                    </div>
                    <button>entrar</button>
                </div>
            </div>
        </div>
    );
}