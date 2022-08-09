import { useState, useEffect } from "react";
import '../assets/styles/Global.css'
import '../assets/styles/ListaUsuarios.css'
import Header from '../components/Header.jsx'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from "@material-ui/styles";
import imgPerfil from '../assets/img/perfilSemFoto.png'
import Footer from "../components/Footer.jsx";
import api, { url } from "../services/api";
import { useNavigate } from 'react-router-dom'
import { parseJwt } from "../services/auth";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    root: {
        '& .css-19kzrtu': {
            padding: "20px 0 0 0"
        }
    }
});

export default function ListaUsuarios() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([])

    function ListUsers() {

        const token = localStorage.getItem('login-usuario-users')

        api.get('/usuarios', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setUsersList(response.data)
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function Verificacao() {

        if (parseJwt().role === '4829f054-5913-464a-96d7-f4030b442be9') {
            console.log(parseJwt())
            navigate('/usuario', { state: { idUsuario: parseJwt().jti } })
        }

        // navigate('/login')
    }

    useEffect(ListUsers, [])
    useEffect(Verificacao, [])

    return (
        <div>
            <Header />
            <main className='mainListaUsuarios'>
                <section className='container'>
                    <h1>Usuários cadastrados</h1>
                    <Box sx={{ width: '100%', padding: '0px' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} textColor="#F57200" onChange={handleChange} TabIndicatorProps={{ style: { background: '#2C3333' } }} aria-label="basic tabs example">
                                <Tab label="geral" {...a11yProps(0)} />
                                <Tab label="root" {...a11yProps(1)} />
                                <Tab label="admin" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <div className="boxSearch">
                            <input type="text" placeholder="Pesquisar usuários" />
                            {
                                parseJwt().role === '862f0a4e-fd18-4ca6-a522-3ebe1fc8e5f5' || parseJwt().role === '01f6ca89-8f02-43bb-9f2f-b1886321ad00' ?
                                    <button onClick={() => navigate('/cadastrar')}>Novo usuário</button>
                                    :
                                    null
                            }

                        </div>
                        <TabPanel className={classes.root} value={value} index={0}>
                            <div className="usersList">
                                {
                                    usersList.filter(user => user.idTipoUsuario === '4829f054-5913-464a-96d7-f4030b442be9').map((userData) => {
                                        return (
                                            <div className="user">
                                                <img src={url + userData.imagemPerfil} alt="" />
                                                <div>
                                                    <p>nome</p>
                                                    <p>{userData.nome}</p>
                                                </div>
                                                <div>
                                                    <p>status</p>
                                                    <p>{userData.statusUsuario === false ? 'Inativo' : 'Ativo'}</p>
                                                </div>
                                                <button onClick={() => navigate('/usuario', { state: { idUsuario: userData.idUsuario } })}>Ver mais</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div className="usersList">
                                {
                                    usersList.filter(user => user.idTipoUsuario === '01f6ca89-8f02-43bb-9f2f-b1886321ad00').map((userData) => {
                                        return (
                                            <div className="user">
                                                <img src={url + userData.imagemPerfil} alt="" />
                                                <div>
                                                    <p>nome</p>
                                                    <p>{userData.nome}</p>
                                                </div>
                                                <div>
                                                    <p>status</p>
                                                    <p>{userData.statusUsuario === false ? 'Inativo' : 'Ativo'}</p>
                                                </div>
                                                <button onClick={() => navigate('/usuario', { state: { idUsuario: userData.idUsuario } })}>Ver mais</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <div className="usersList">
                                {
                                    usersList.filter(user => user.idTipoUsuario === '862f0a4e-fd18-4ca6-a522-3ebe1fc8e5f5').map((userData) => {
                                        return (
                                            <div className="user">
                                                <img src={url + userData.imagemPerfil} alt="" />
                                                <div>
                                                    <p>nome</p>
                                                    <p>{userData.nome}</p>
                                                </div>
                                                <div>
                                                    <p>status</p>
                                                    <p>{userData.statusUsuario === false ? 'Inativo' : 'Ativo'}</p>
                                                </div>
                                                <button onClick={() => navigate('/usuario', { state: { idUsuario: userData.idUsuario } })}>Ver mais</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TabPanel>
                    </Box>
                </section>
            </main>
            <Footer />
        </div>
    )
}