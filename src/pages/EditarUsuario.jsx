import '../assets/styles/Global.css'
import '../assets/styles/EditarUsuario.css'
import '../assets/styles/Usuario.css'
import imgProfile from '../assets/img/perfilSemFoto.png'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api, { url } from '../services/api'
import { parseJwt } from '../services/auth'

const validationSchema = yup.object().shape({
    nome: yup.string().required('O nome é obrigatório'),
    email: yup.string().email("Informe um e-mail válido").required("O e-mail é obrigatório"),
    senha: yup.string().required("A senha é obrigatória"),
    tipoUsuario: yup.string().min(36, "Escolha um tipo de usuário").typeError("Escolha um tipo de usuário"),
    statusUsuario: yup.boolean().typeError("Escolha um status para o usuário")
})

export default function EditarUsuario() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("")
    const [tiposUsuario, setTiposUsuario] = useState([])
    const [tipoUsuario, setTipoUsuario] = useState(null)
    const [statusUsuario, setStatusUsuario] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState(null)

    const location = useLocation()

    const navigate = useNavigate()

    // const { setValue } = useForm();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    function Atualizar(data, event) {
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

        api.put('/usuarios/' + location.state?.idUsuario, formData, {
            headers: {
                // "Accept": "application/json",
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + token,
            }
        })

            .then(response => {
                if (response.status === 200) {
                    navigate(-1)
                }
            })
            .catch(erro => {
                console.log(JSON.stringify(erro))
            })
    }

    function BuscarPerfil() {

        setIsLoading(true)
        const token = localStorage.getItem('login-usuario-users')

        api.get('/usuarios/' + location.state?.idUsuario, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    setEmail(response.data.email)
                    setNome(response.data.nome)
                    setStatusUsuario(response.data.statusUsuario)
                    setTipoUsuario(response.data.idTipoUsuario)
                    setValue('tipoUsuario', await response.data.idTipoUsuario)
                    setValue('nome', await response.data.nome)
                    setValue('email', await response.data.email)
                    setValue('statusUsuario', await response.data.statusUsuario)

                    await UrlToFile(await response.data.imagemPerfil)
                }
            }).catch(erro => {
                console.log(erro)
            })
        setIsLoading(false)

        
    }

    async function UrlToFile(caminhoImagem) {
        let resposta = await fetch(`${url}${caminhoImagem}`);
        let data = await resposta.blob();
        let arquivo = new File([data], caminhoImagem, { type: `image/${caminhoImagem.split(".")[1]}` });

        const image = {
            url: `${url}${caminhoImagem}`,
            file: arquivo
        }

        setImg(image)
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
        if (parseJwt()=== null) {
            navigate('/login')
        }
    }

    useEffect(ListarTiposUsuario, [])
    useEffect(BuscarPerfil, [])
    useEffect(Verificacao, [])

    return (
        <div>
            <Header />
            {
                isLoading === true ?
                    <div></div>
                    :
                    <main className='mainUpdate'>
                        <section className='sectionUpdate container'>
                            <div className='boxBtn'>
                                <button onClick={() => navigate(-1)}>
                                    <span className="iconify-inline" data-icon="akar-icons:chevron-left"></span>
                                    <p>Voltar</p>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(Atualizar)} className='containerUpdate'>
                                <div className='boxUpdateImage'>
                                    <div>
                                        <img src={img?.url} alt="" />
                                        <label for='image'>Substituir imagem</label>
                                        <input onChange={(a) => Preview(a.target.files)} type="file" name="" id="image" />
                                    </div>
                                </div>
                                <div className='boxUpdateInfo'>
                                    <div className='boxInputs'>
                                        <div className='updateLine'>
                                            <label htmlFor="">nome</label>
                                            <input  {...register("nome")} onChange={a => setNome(a.target.value)} type="text" />
                                        </div>
                                        <div className='updateLine'>
                                            <label htmlFor="">e-mail</label>
                                            <input {...register("email")} onChange={a => setEmail(a.target.value)} type="text" />
                                        </div>
                                        <div className='updateLine'>
                                            <label htmlFor="">tipo de usuário</label>
                                            <select {...register("tipoUsuario")} onChange={a => setTipoUsuario(a.target.value)}>
                                                {
                                                    tiposUsuario.map(tipoUsuario => {
                                                        return (
                                                            <option value={tipoUsuario.idTipoUsuario}>{tipoUsuario.nomeTipoUsuario}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className='updateLine'>
                                            <label htmlFor="">status</label>
                                            <select {...register("statusUsuario")} onChange={a => setStatusUsuario(a.target.value)}>
                                                <option value={true}>Ativo</option>
                                                <option value={false}>Inativo</option>
                                            </select>
                                        </div>
                                        <div className='updateLine'>
                                            <label htmlFor="">Nova senha</label>
                                            <input {...register("senha")} onChange={a => setSenha(a.target.value)} type="password" />
                                        </div>
                                    </div>
                                    <button type='submit'>Salvar alterações</button>
                                </div>
                            </form>
                        </section>
                    </main>
            }
            <Footer />
        </div>
    )
}