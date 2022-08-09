import '../assets/styles/Global.css'
import '../assets/styles/Usuario.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import "https://code.iconify.design/2/2.1.2/iconify.min.js"
import { useLocation, useNavigate } from "react-router-dom"
import { Modal, Button, Text } from "@nextui-org/react";
import { useState, useEffect } from 'react'
import api, { url } from '../services/api'
import { parseJwt } from '../services/auth'

export default function Usuario() {
    const location = useLocation()
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    function ListUser() {
        Verificacao()
        const token = localStorage.getItem('login-usuario-users')

        api.get('/usuarios/' + location.state?.idUsuario, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data)
                }
            }).catch(erro => {
                console.log(erro)
            })
    }

    function Delete() {

        const token = localStorage.getItem('login-usuario-users')

        api.delete('/usuarios/' + location.state?.idUsuario, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    closeHandler()
                    navigate('/listausuarios')
                }
            })
    }

    function Verificacao() {
        if (parseJwt() === null) {
            navigate('/login')
        }
    }

    useEffect(Verificacao, [])
    useEffect(ListUser, [])


    return (
        <div>
            <Header />
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        <Text b size={18}>
                            Tem certeza de que deseja deletar esse usuário?
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text size={18}>
                        Essa ação não poderá ser revertida e nem os dados recuperados
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto onClick={closeHandler}>
                        Cancelar
                    </Button>
                    <Button auto flat color="error" onClick={Delete}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
            <main className='mainUsuario'>
                <section className='sectionUser container'>
                    <div className='boxBtn'>
                        <button onClick={() => navigate(-1)}>
                            <span className="iconify-inline" data-icon="akar-icons:chevron-left"></span>
                            <p>Voltar</p>
                        </button>
                    </div>
                    <div className='boxProfile'>
                        <div className='boxImage'>
                            <img src={url + user?.imagemPerfil} alt="" />
                            <p>{user.nome}</p>
                            <div>
                                <button onClick={() => navigate('/editar', { state: { idUsuario: user.idUsuario } })}>Editar usuário</button>
                                {
                                    parseJwt().role === '01f6ca89-8f02-43bb-9f2f-b1886321ad00' ?
                                        <button onClick={handler}>Deletar usuário</button>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        <div className='boxData'>
                            <div className='dataLine'>
                                <p>e-mail</p>
                                <p>{user.email}</p>
                            </div>
                            <div className='dataLine'>
                                <p>tipo de usuário</p>
                                <p>{user?.idTipoUsuarioNavigation?.nomeTipoUsuario}</p>
                            </div>
                            <div className='dataLine'>
                                <p>status</p>
                                <p>{user?.statusUsuario === false ? 'Inativo' : 'Ativo'}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}