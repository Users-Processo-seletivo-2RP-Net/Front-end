import '../assets/styles/Global.css'
import '../assets/styles/Cadastrar.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import imgRegister from '../assets/img/perfilSemFoto.png'
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { parseJwt } from '../services/auth'

const validationSchema = yup.object().shape({
    nome: yup.string().required('O nome é obrigatório'),
    email: yup.string().email("Informe um e-mail válido").required("O e-mail é obrigatório"),
    senha: yup.string().required("A senha é obrigatória"),
    tipoUsuario: yup.string().min(36, "Escolha um tipo de usuário").typeError("Escolha um tipo de usuário"),
    statusUsuario: yup.boolean().typeError("Escolha um status para o usuário")
})

export default function Cadastrar() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("")
    const [tiposUsuario, setTiposUsuario] = useState([])
    const [tipoUsuario, setTipoUsuario] = useState(null)
    const [statusUsuario, setStatusUsuario] = useState(null)
    const [img, setImg] = useState(null)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    function Cadastrar(data, event) {
        event.preventDefault();

        var formData = new FormData()

        formData.append('IdTipoUsuario', tipoUsuario)
        formData.append('Nome', nome)
        formData.append('Email', email)
        formData.append('Senha', senha)
        formData.append('StatusUsuario', statusUsuario)

        if (img !== null) {
            formData.append('imagem', img.file)
        }

        const token = localStorage.getItem('login-usuario-users')

        for (var value of formData.entries()) {
            console.log(value);
        }

        api.post('/usuarios', formData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                if (response.status === 201) {
                    navigate('/listausuarios')
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    function Preview(img) {
        const arquivosArray = Array.from(img).map((arquivo) => URL.createObjectURL(arquivo))

        const imagem = {
            url: arquivosArray[0],
            file: img[0]
        }

        setImg(imagem)
    }

    function ListarTiposUsuario() {
        console.log(img)
        const token = localStorage.getItem('login-usuario-users')

        api.get('/tiposusuario', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setTiposUsuario(response.data)
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    function Verificacao() {
        if (parseJwt().role === '4829f054-5913-464a-96d7-f4030b442be9') {
            navigate('/usuario', { state: { idUsuario: parseJwt().jti } })
        }
    }

    useEffect(ListarTiposUsuario, [])
    useEffect(Verificacao, [])

    return (
        <div>
            <Header />
            <main className='mainCadastro'>
                <section className='sectionRegister container'>
                    <form onSubmit={handleSubmit(Cadastrar)} className='boxRegister'>
                        <h1>Cadastrar um novo usuário</h1>
                        <div>
                            <img src={img !== null ? img.url : imgRegister} alt="" />
                            <label for='image'>Adicionar imagem</label>
                            <input onChange={(a) => Preview(a.target.files)} type="file" name="" id="image" />
                        </div>
                        <div>
                            <input {...register("nome")} value={nome} onChange={a => setNome(a.target.value)} placeholder='Nome' type="text" />
                            <p className="inputError">{errors.nome?.message}</p>

                            <input {...register("email")} value={email} onChange={a => setEmail(a.target.value)} placeholder='E-mail' type="text" />
                            <p className="inputError">{errors.email?.message}</p>

                            <input {...register("senha")} value={senha} onChange={a => setSenha(a.target.value)} placeholder='Senha' type="password" />
                            <p className="inputError">{errors.senha?.message}</p>

                            <select {...register("tipoUsuario")} value={tipoUsuario} onChange={a => setTipoUsuario(a.target.value)}>
                                <option value={null} disabled selected>Tipo de usuário</option>
                                {
                                    tiposUsuario.map(tipoUsuario => {
                                        return (
                                            <option value={tipoUsuario.idTipoUsuario}>{tipoUsuario.nomeTipoUsuario}</option>
                                        )
                                    })
                                }

                            </select>
                            <p className="inputError">{errors.tipoUsuario?.message}</p>

                            <select {...register("statusUsuario")} value={statusUsuario} onChange={a => setStatusUsuario(a.target.value)}>
                                <option value={null} disabled selected>Status</option>
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                            </select>
                            <p className="inputError">{errors.statusUsuario?.message}</p>

                        </div>
                        <div>
                            <button type='button' onClick={() => navigate(-1)}>Cancelar</button>
                            <button type='submit'>Cadastrar</button>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    )
}