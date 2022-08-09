import React, { useEffect, useState } from 'react';
import '../assets/styles/Global.css'
import '../assets/styles/Login.css'
import logo from '../assets/img/logo2.svg'
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../services/auth';

const validationSchema = yup.object().shape({
    email: yup.string().email("Informe um e-mail válido").required("O e-mail é obrigatório"),
    senha: yup.string().required("A senha é obrigatória")
})

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })


    function LoginUsers(data, event) {
        event.preventDefault()

        console.log(email)
        console.log(senha)

        api.post('/login', {
            Email: email,
            Senha: senha
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('login-usuario-users', response.data.token)
                    if (parseJwt().role === '862f0a4e-fd18-4ca6-a522-3ebe1fc8e5f5' || parseJwt().role === '01f6ca89-8f02-43bb-9f2f-b1886321ad00') {
                        navigate('/listausuarios')
                    } else {
                        navigate('/usuario', { state: { idUsuario: parseJwt().jti } })
                    }
                } else {
                    toast.error("E-mail ou senha inválidos!")
                }
            })
            .catch(erro => {
                console.log(erro)
                toast.error("E-mail ou senha inválidos!")
            })
    }

    function Verificacao() {
        if (parseJwt() === null) {
            navigate('/login')
        }
    }

    useEffect(Verificacao, [])

    return (
        <div>
            <ToastContainer />
            <div className='box-login'>
                <form onSubmit={handleSubmit(LoginUsers)} className='content'>
                    <img src={logo} alt="" />
                    <h1>Bem vindo(a)!</h1>
                    <div>
                        <input value={email} {...register("email")} placeholder='E-mail' type="text" onChange={a => setEmail(a.target.value)} />
                        <p className="inputError">{errors.email?.message}</p>
                        <input value={senha} {...register("senha")} placeholder='Senha' type="password" onChange={a => setSenha(a.target.value)} />
                        <p className="inputError">{errors.senha?.message}</p>
                    </div>
                    <button type='submit'>entrar</button>
                </form>
            </div>
        </div>
    );
}