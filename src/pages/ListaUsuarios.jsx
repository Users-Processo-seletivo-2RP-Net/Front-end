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
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                            <button>Novo usuário</button>
                        </div>
                        <TabPanel className={classes.root} value={value} index={0}>
                            <div className="usersList">
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                                <div className="user">
                                    <img src={imgPerfil} alt="" />
                                    <div>
                                        <p>nome</p>
                                        <p>Max Verstappen</p>
                                    </div>
                                    <div>
                                        <p>status</p>
                                        <p>Ativo</p>
                                    </div>
                                    <button>Ver mais</button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                    </Box>
                </section>
            </main>
            <Footer />
        </div>
    )
}